import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Logo from '../components/Logo'
import { FaDumbbell, FaChartLine, FaMobileAlt, FaCalendarAlt } from 'react-icons/fa'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { theme } = useTheme()

  const handleFeatureClick = (path: string) => {
    if (!session) {
      router.push('/auth/signin')
    } else {
      router.push(path)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Show landing page for unauthenticated users
  if (!session) {
    return (
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
          {/* Hero Section */}
          <div className="relative">
            <div className="container mx-auto px-4 pt-32 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="flex justify-center mb-8">
                  <Logo className="scale-150" />
                </div>
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Transform Your Fitness Journey
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Track, analyze, and improve your workouts with our intuitive fitness tracking platform.
                  Take control of your fitness journey today.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/auth/signup')}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold shadow-lg shadow-blue-500/25"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/about')}
                    className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-lg font-semibold"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 py-24">
            <motion.h2 
              className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Everything you need to succeed
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-center mb-16 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Comprehensive tools to track and improve your fitness journey
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl cursor-pointer"
                onClick={() => handleFeatureClick('/workouts')}
              >
                <div className="bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <FaDumbbell className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Workout Tracking</h3>
                <p className="text-gray-400">
                  Log your exercises, sets, reps, and weights with our intuitive tracking system
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl cursor-pointer"
                onClick={() => handleFeatureClick('/analytics')}
              >
                <div className="bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <FaChartLine className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Progress Analytics</h3>
                <p className="text-gray-400">
                  Visualize your progress with detailed charts and performance metrics
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl cursor-pointer"
                onClick={() => handleFeatureClick('/planner')}
              >
                <div className="bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <FaCalendarAlt className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Workout Planning</h3>
                <p className="text-gray-400">
                  Plan and schedule your workouts with our flexible calendar system
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl cursor-pointer"
                onClick={() => handleFeatureClick('/mobile')}
              >
                <div className="bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <FaMobileAlt className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Mobile Access</h3>
                <p className="text-gray-400">
                  Access your workouts anywhere with our mobile-friendly design
                </p>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="container mx-auto px-4 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-12 rounded-2xl max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Ready to start your fitness journey?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Join 4WORD Performance & Wellness today and take the first step towards achieving your fitness goals.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/signup')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold shadow-lg shadow-blue-500/25"
              >
                Create Free Account
              </motion.button>
            </motion.div>
          </div>
        </div>
      </>
    )
  }

  // Show dashboard for authenticated users
  return (
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
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Welcome back, {session.user?.name}!
            </h1>
            <p className="text-lg text-gray-300">
              Ready to crush your fitness goals?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Start a Workout
              </h2>
              <p className="text-gray-400 mb-4">
                Begin a new workout session and track your progress.
              </p>
              <button
                onClick={() => router.push('/workouts/new')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                New Workout
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                View History
              </h2>
              <p className="text-gray-400 mb-4">
                Check your past workouts and track your progress over time.
              </p>
              <button
                onClick={() => router.push('/workouts/history')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Workout History
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Set Goals
              </h2>
              <p className="text-gray-400 mb-4">
                Define your fitness goals and track your achievements.
              </p>
              <button
                onClick={() => router.push('/goals')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Manage Goals
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
} 