import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useTheme } from '../../contexts/ThemeContext'
import { FaGoogle } from 'react-icons/fa'
import { supabase } from '../../lib/supabase'

export default function SignUp() {
  const router = useRouter()
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      if (user) {
        // Sign in the user after successful signup
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })

        if (result?.error) {
          setError('Account created but unable to sign in automatically')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      setError('An error occurred during sign up')
    }
  }

  const handleOAuthSignUp = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: '/dashboard',
        redirect: false,
      })
      
      if (result?.error) {
        setError(`${provider} sign up failed: ${result.error}`)
      } else if (result?.url) {
        router.push(result.url)
      }
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
    divider: theme === 'dark' ? 'border-gray-700' : 'border-gray-300',
    oauth: `w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border rounded-md shadow-sm text-sm font-medium transition-all duration-200 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 ${
      theme === 'dark'
      ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 ring-offset-gray-900'
      : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 ring-offset-white'
    }`
  }

  return (
    <Layout>
      <div className={`min-h-screen flex items-center justify-center ${getThemeClasses.background} py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className={`mt-6 text-center text-3xl font-extrabold ${getThemeClasses.text}`}>
              Create your account
            </h2>
            <p className={`mt-2 text-center text-sm ${getThemeClasses.subtext}`}>
              Or{' '}
              <a href="/auth/signin" className={`font-medium ${getThemeClasses.link}`}>
                sign in to your account
              </a>
            </p>
          </div>

          <div className="mt-6">
            <div className="flex justify-center">
              <button
                onClick={() => handleOAuthSignUp('google')}
                className={getThemeClasses.oauth}
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span>Sign up with Google</span>
              </button>
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
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className={`rounded-md ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-50'} p-4`}>
                <div className={`text-sm ${theme === 'dark' ? 'text-red-200' : 'text-red-700'}`}>
                  {error}
                </div>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:z-10 sm:text-sm ${getThemeClasses.input}`}
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm ${getThemeClasses.input}`}
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
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${getThemeClasses.button}`}
              >
                Sign up with Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
} 