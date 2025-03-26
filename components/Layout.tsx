import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import { FaHome, FaDumbbell, FaChartLine, FaUser } from 'react-icons/fa'
import Logo from './Logo'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Head>
        <title>4WORD P&W</title>
        <meta name="description" content="Transform your fitness journey with 4WORD Performance & Wellness" />
      </Head>
      <nav className="bg-gray-800/50 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side navigation */}
            {session && (
              <div className="flex items-center sm:space-x-8">
                <Link
                  href="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-100"
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>
                <Link
                  href="/goals"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-100"
                >
                  <FaChartLine className="mr-2" />
                  Goals
                </Link>
                <Link
                  href="/workouts"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-100"
                >
                  <FaDumbbell className="mr-2" />
                  Workouts
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:border-gray-300 hover:text-gray-100"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              </div>
            )}

            {/* Right side with logo and auth buttons */}
            <div className="flex items-center space-x-8">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign out
                </button>
              ) : (
                <div className="space-x-6">
                  <Link
                    href="/auth/signin"
                    className="text-gray-300 hover:text-gray-100"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </div>
              )}
              <div className="flex-shrink-0 flex items-center">
                <Logo 
                  className="transform transition-all duration-200 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
} 