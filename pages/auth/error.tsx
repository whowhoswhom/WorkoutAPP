import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

export default function ErrorPage() {
  const router = useRouter()
  const { error } = router.query

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.'
      case 'AccessDenied':
        return 'You do not have permission to sign in.'
      case 'Verification':
        return 'The verification link was invalid or has expired.'
      case 'OAuthSignin':
        return 'Error in the OAuth sign-in process.'
      case 'OAuthCallback':
        return 'Error in the OAuth callback process.'
      case 'OAuthCreateAccount':
        return 'Could not create OAuth provider account.'
      case 'EmailCreateAccount':
        return 'Could not create email provider account.'
      case 'Callback':
        return 'Error in the OAuth callback handler.'
      case 'OAuthAccountNotLinked':
        return 'Email already exists with different provider.'
      case 'EmailSignin':
        return 'Check your email address.'
      case 'CredentialsSignin':
        return 'Sign in failed. Check your credentials.'
      default:
        return 'An error occurred during authentication.'
    }
  }

  return (
    <Layout>
      <>
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

        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl text-center"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-white">
                Authentication Error
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                {error ? getErrorMessage(error as string) : 'An error occurred during authentication.'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/auth/signin')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-500/25"
            >
              Return to Sign In
            </motion.button>
          </motion.div>
        </div>
      </>
    </Layout>
  )
} 