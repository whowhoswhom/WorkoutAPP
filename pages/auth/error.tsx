import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useTheme } from '../../contexts/ThemeContext'

export default function ErrorPage() {
  const router = useRouter()
  const { theme } = useTheme()
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

  const getThemeClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    subtext: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    button: `${theme === 'dark'
      ? 'bg-blue-500 hover:bg-blue-600'
      : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2`
  }

  return (
    <Layout>
      <div className={`min-h-screen flex items-center justify-center ${getThemeClasses.background} py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className={`text-3xl font-extrabold ${getThemeClasses.text}`}>
              Authentication Error
            </h2>
            <p className={`mt-2 text-sm ${getThemeClasses.subtext}`}>
              {error ? getErrorMessage(error as string) : 'An error occurred during authentication.'}
            </p>
          </div>
          <div>
            <button
              onClick={() => router.push('/auth/signin')}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${getThemeClasses.button}`}
            >
              Return to Sign In
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
} 