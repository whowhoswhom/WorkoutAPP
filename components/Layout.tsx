import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { FaSun, FaMoon } from 'react-icons/fa'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const linkStyles = `text-sm font-medium transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 rounded-md px-3 py-2 ${
    theme === 'dark'
    ? 'text-gray-300 hover:text-white ring-offset-gray-900'
    : 'text-gray-700 hover:text-gray-900 ring-offset-white'
  }`

  const primaryButtonStyles = `transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 rounded-md px-4 py-2 ${
    theme === 'dark'
    ? 'bg-blue-500 hover:bg-blue-600 ring-offset-gray-900'
    : 'bg-blue-600 hover:bg-blue-700 ring-offset-white'
  } text-white`

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
      <nav className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  FitFlow
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 ${
                  theme === 'dark'
                  ? 'text-gray-300 hover:text-white ring-offset-gray-900'
                  : 'text-gray-700 hover:text-gray-900 ring-offset-white'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FaSun className="w-5 h-5" />
                ) : (
                  <FaMoon className="w-5 h-5" />
                )}
              </button>

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className={linkStyles}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={linkStyles}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className={linkStyles}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className={primaryButtonStyles}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className={`flex-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {children}
      </main>
    </div>
  )
} 