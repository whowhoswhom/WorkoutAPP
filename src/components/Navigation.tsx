'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import SignOutButton from './SignOutButton'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }
    checkAuth()
  }, [supabase.auth])

  // Don't show navigation on auth pages
  if (pathname?.startsWith('/auth/')) {
    return null
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            4WORD
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
} 