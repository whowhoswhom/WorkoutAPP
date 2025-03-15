import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Layout from '../../components/Layout'
import { useTheme } from '../../contexts/ThemeContext'

export default function SignOut() {
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      signOut({ callbackUrl: '/' })
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const getThemeClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    subtext: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
  }

  return (
    <Layout>
      <div className={`min-h-screen flex items-center justify-center ${getThemeClasses.background} py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className={`text-3xl font-extrabold ${getThemeClasses.text}`}>
              Signing Out...
            </h2>
            <p className={`mt-2 text-sm ${getThemeClasses.subtext}`}>
              You will be redirected to the home page in a few seconds.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
} 