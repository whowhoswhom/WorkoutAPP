import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  CalendarIcon,
  Cog6ToothIcon as CogIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  UserIcon,
  ArrowRightIcon,
  FireIcon,
  BoltIcon as LightningBoltIcon,
  ClockIcon,
  ChartPieIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const motivationalQuotes = [
  "Every rep counts towards your goals!",
  "Make today's workout your best one yet!",
  "Small progress is still progress!",
  "Your future self will thank you!",
  "Stay consistent, stay strong!"
]

const recentWorkouts = [
  { type: 'Strength Training', date: '2024-03-18', duration: '45 mins' },
  { type: 'Cardio', date: '2024-03-16', duration: '30 mins' },
  { type: 'HIIT', date: '2024-03-15', duration: '25 mins' }
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [greeting, setGreeting] = useState('')
  const [quote, setQuote] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    // Set time-based greeting
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    // Set random quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    setQuote(randomQuote)
  }, [])

  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-white">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!session) return null

  return (
    <Layout>
      <div className="min-h-screen bg-[#0F172A] text-white">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 -z-10" />
        <div 
          className="fixed inset-0 -z-10" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Access Bar */}
          <div className="flex justify-end space-x-4 mb-8">
            {[
              { icon: CalendarIcon, label: 'Calendar' },
              { icon: UserIcon, label: 'Profile' },
              { icon: CogIcon, label: 'Settings' },
              { icon: LogoutIcon, label: 'Logout' }
            ].map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
                title={item.label}
              >
                <item.icon className="w-6 h-6" />
              </motion.button>
            ))}
          </div>

          {/* Main Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Welcome Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{greeting}, {session.user?.name}!</h2>
                    <p className="text-gray-400">3 days streak | 2 workouts this week</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">{quote}</p>
              </motion.div>

              {/* Stats Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Workouts</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Hours Trained</span>
                    <span className="font-semibold">32.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Current Goal</span>
                    <span className="font-semibold">Build Strength</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              {/* Today's Snapshot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  { icon: FireIcon, label: 'Calories', value: '320 kcal', color: 'from-orange-500/20 to-red-500/20' },
                  { icon: LightningBoltIcon, label: 'Daily Goal', value: '75% Complete', color: 'from-green-500/20 to-emerald-500/20' },
                  { icon: HeartIcon, label: 'Active Minutes', value: '45 mins', color: 'from-pink-500/20 to-rose-500/20' }
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} backdrop-blur-sm`}
                  >
                    <stat.icon className="w-8 h-8 mb-2" />
                    <p className="text-gray-300">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Start Workout', icon: LightningBoltIcon, color: 'from-blue-500/20 to-cyan-500/20' },
                  { title: 'View History', icon: ChartPieIcon, color: 'from-purple-500/20 to-pink-500/20' },
                  { title: 'Set Goals', icon: ChartBarIcon, color: 'from-emerald-500/20 to-teal-500/20' }
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                    className={`p-6 rounded-xl bg-gradient-to-br ${card.color} backdrop-blur-sm cursor-pointer group`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <card.icon className="w-8 h-8" />
                      <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">Click to learn more</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentWorkouts.map((workout, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <ClockIcon className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="font-medium">{workout.type}</p>
                          <p className="text-sm text-gray-400">{workout.date}</p>
                        </div>
                      </div>
                      <span className="text-gray-300">{workout.duration}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 