import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import Logo from '../../components/Logo'
import Link from 'next/link'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
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
        <title>Sign Up - 4WORD P&W</title>
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
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Create your account
          </h2>

          {/* Social Sign In Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleAppleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              <FaApple className="h-5 w-5 mr-3" />
              Continue with Apple
            </button>

            <button
              onClick={handleFacebookSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              <FaFacebook className="h-5 w-5 mr-3 text-blue-500" />
              Continue with Facebook
            </button>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              <FaGoogle className="h-5 w-5 mr-3 text-red-500" />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800/50 text-gray-400">OR</span>
            </div>
          </div>

          {/* Email Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
              <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
            >
              Create account
            </motion.button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <Link
              href="/auth/signin"
              className="text-gray-400 hover:text-gray-300 underline"
            >
              Already have an account?
            </Link>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center space-x-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}