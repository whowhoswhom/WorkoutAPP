import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-white">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!session) {
    return null
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

        <div className="relative min-h-screen text-white">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-white mb-6"
              >
                Your Profile
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6"
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Personal Information
                    </h2>
                    <div className="mt-2">
                      <p className="text-gray-300">
                        Name: {session.user?.name}
                      </p>
                      <p className="text-gray-300">
                        Email: {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Fitness Stats
                    </h2>
                    <p className="mt-2 text-gray-300">
                      Your fitness stats will appear here as you track your workouts.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
} 