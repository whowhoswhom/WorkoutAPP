import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import Logo from '../../components/Logo'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Invalid email or password')
        return
      }

      const callbackUrl = (router.query.callbackUrl as string) || '/'
      router.push(callbackUrl)
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleGoogleSignIn = () => signIn('google', { callbackUrl: '/' })
  const handleFacebookSignIn = () => signIn('facebook', { callbackUrl: '/' })
  const handleAppleSignIn = () => signIn('apple', { callbackUrl: '/' })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Sign In - 4WORD P&W</title>
      </Head>

      {/* Fixed Background */}
      <div className="fixed inset-0 bg-[#0F172A] -z-20" />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 -z-10" />
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo className="scale-150" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl"
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sign in to continue your fitness journey
          </motion.p>

          {/* Social Sign In Buttons */}
          <motion.div 
            className="space-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAppleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              <FaApple className="h-5 w-5 mr-3" />
              Continue with Apple
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFacebookSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              <FaFacebook className="h-5 w-5 mr-3 text-blue-500" />
              Continue with Facebook
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              <FaGoogle className="h-5 w-5 mr-3 text-red-500" />
              Continue with Google
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="relative my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800/50 text-gray-400">OR</span>
            </div>
          </motion.div>

          {/* Email Sign In Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-500/25"
            >
              Sign In
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/auth/signup"
              className="text-gray-400 hover:text-gray-300 hover:underline"
            >
              Don't have an account? <span className="text-blue-400">Sign up</span>
            </Link>
          </motion.div>

          {/* Footer Links */}
          <motion.div 
            className="mt-8 flex justify-center space-x-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 