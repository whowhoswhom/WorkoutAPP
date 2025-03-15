import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useTheme } from '../../contexts/ThemeContext'
import { FaGoogle, FaGithub, FaApple, FaMicrosoft } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function SignUp() {
  const router = useRouter()
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Something went wrong')
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Error signing in after registration')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during sign up')
    }
  }

  const handleOAuthSignUp = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/dashboard' })
    } catch (error) {
      setError(`An error occurred during ${provider} sign up`)
    }
  }

  const getThemeClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    subtext: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    link: theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500',
    input: theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' 
      : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500',
    button: `${theme === 'dark'
      ? 'bg-blue-500 hover:bg-blue-600 focus:ring-offset-gray-900'
      : 'bg-blue-600 hover:bg-blue-700'} transform transition-all duration-200 hover:scale-105 active:scale-95`,
    divider: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    oauth: `${theme === 'dark'
      ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
      : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'} 
      transition-all duration-200`
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const oauthProviders = [
    { id: 'google', name: 'Google', icon: FaGoogle, color: 'text-red-600' },
    { id: 'github', name: 'GitHub', icon: FaGithub, color: theme === 'dark' ? 'text-white' : 'text-gray-900' },
    { id: 'apple', name: 'Apple', icon: FaApple, color: theme === 'dark' ? 'text-white' : 'text-gray-900' },
    { id: 'azure-ad', name: 'Microsoft', icon: FaMicrosoft, color: 'text-blue-500' }
  ]

  return (
    <Layout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        className={`min-h-screen flex items-center justify-center ${getThemeClasses.background} py-12 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-md w-full space-y-8">
          <div>
            <motion.h2 
              variants={fadeInUpVariants}
              className={`mt-6 text-center text-3xl font-extrabold ${getThemeClasses.text}`}
            >
              Create your account
            </motion.h2>
            <motion.p 
              variants={fadeInUpVariants}
              className={`mt-2 text-center text-sm ${getThemeClasses.subtext}`}
            >
              Or{' '}
              <a href="/auth/signin" className={`font-medium ${getThemeClasses.link}`}>
                sign in to your account
              </a>
            </motion.p>
          </div>

          <motion.div variants={fadeInUpVariants}>
            <div className="grid grid-cols-2 gap-3">
              {oauthProviders.map((provider) => (
                <motion.button
                  key={provider.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOAuthSignUp(provider.id)}
                  className={`relative w-full inline-flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${getThemeClasses.oauth}`}
                >
                  <provider.icon className={`w-5 h-5 mr-2 ${provider.color}`} />
                  <span>Sign up with {provider.name}</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${getThemeClasses.divider}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${getThemeClasses.background} ${getThemeClasses.subtext}`}>
                  Or continue with email
                </span>
              </div>
            </div>
          </motion.div>

          <motion.form 
            variants={fadeInUpVariants}
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
          >
            {error && (
              <div className={`rounded-md ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-50'} p-4`}>
                <div className={`text-sm ${theme === 'dark' ? 'text-red-200' : 'text-red-700'}`}>
                  {error}
                </div>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:z-10 sm:text-sm ${getThemeClasses.input}`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md focus:outline-none focus:z-10 sm:text-sm ${getThemeClasses.input}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${getThemeClasses.button}`}
              >
                Sign up with Email
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </Layout>
  )
} 