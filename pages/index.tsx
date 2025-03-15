import Layout from '../components/Layout'
import { useTheme } from '../contexts/ThemeContext'
import { FaDumbbell, FaChartLine, FaCalendarAlt, FaMobileAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Home() {
  const { theme } = useTheme()

  const getThemeClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    subtext: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    cardHover: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    button: theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    buttonSecondary: theme === 'dark'
      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        className={`${getThemeClasses.background} py-16 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              variants={fadeInUpVariants}
              className={`text-4xl tracking-tight font-extrabold ${getThemeClasses.text} sm:text-5xl md:text-6xl`}
            >
              <motion.span 
                variants={fadeInUpVariants}
                className="block"
              >
                Transform Your Fitness Journey with
              </motion.span>
              <motion.span 
                variants={fadeInUpVariants}
                className="block text-blue-600"
              >
                FitFlow
              </motion.span>
            </motion.h1>
            <motion.p 
              variants={fadeInUpVariants}
              className={`mt-3 max-w-md mx-auto text-lg ${getThemeClasses.subtext} sm:text-xl md:mt-5 md:max-w-3xl`}
            >
              Track, analyze, and improve your workouts with our intuitive fitness tracking platform. 
              Take control of your fitness journey today.
            </motion.p>
            <motion.div 
              variants={fadeInUpVariants}
              className="mt-10 flex justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/auth/signin"
                className={`px-8 py-3 rounded-md shadow-sm font-medium text-base ${getThemeClasses.button}`}
              >
                Get Started
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features"
                className={`px-8 py-3 rounded-md shadow-sm font-medium text-base ${getThemeClasses.buttonSecondary}`}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        id="features" 
        className={`py-24 ${getThemeClasses.background}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUpVariants}
            className="text-center"
          >
            <motion.h2 
              variants={fadeInUpVariants}
              className={`text-3xl font-extrabold ${getThemeClasses.text} sm:text-4xl`}
            >
              Everything you need to succeed
            </motion.h2>
            <motion.p 
              variants={fadeInUpVariants}
              className={`mt-4 max-w-2xl mx-auto text-xl ${getThemeClasses.subtext}`}
            >
              FitFlow provides all the tools you need to track and improve your fitness journey
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Workout Tracking */}
              <motion.div 
                variants={scaleInVariants}
                whileHover={{ scale: 1.05 }}
                className={`relative p-6 ${getThemeClasses.card} rounded-lg shadow-sm transition-all duration-200`}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`h-12 w-12 rounded-md ${getThemeClasses.button} flex items-center justify-center mb-4`}
                >
                  <FaDumbbell className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h3 className={`text-xl font-bold ${getThemeClasses.text}`}>Workout Tracking</h3>
                <p className={`mt-2 ${getThemeClasses.subtext}`}>
                  Log your exercises, sets, reps, and weights with our intuitive tracking system
                </p>
              </motion.div>

              {/* Progress Analytics */}
              <motion.div 
                variants={scaleInVariants}
                whileHover={{ scale: 1.05 }}
                className={`relative p-6 ${getThemeClasses.card} rounded-lg shadow-sm transition-all duration-200`}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`h-12 w-12 rounded-md ${getThemeClasses.button} flex items-center justify-center mb-4`}
                >
                  <FaChartLine className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h3 className={`text-xl font-bold ${getThemeClasses.text}`}>Progress Analytics</h3>
                <p className={`mt-2 ${getThemeClasses.subtext}`}>
                  Visualize your progress with detailed charts and performance metrics
                </p>
              </motion.div>

              {/* Workout Planning */}
              <motion.div 
                variants={scaleInVariants}
                whileHover={{ scale: 1.05 }}
                className={`relative p-6 ${getThemeClasses.card} rounded-lg shadow-sm transition-all duration-200`}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`h-12 w-12 rounded-md ${getThemeClasses.button} flex items-center justify-center mb-4`}
                >
                  <FaCalendarAlt className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h3 className={`text-xl font-bold ${getThemeClasses.text}`}>Workout Planning</h3>
                <p className={`mt-2 ${getThemeClasses.subtext}`}>
                  Plan and schedule your workouts with our flexible calendar system
                </p>
              </motion.div>

              {/* Mobile Access */}
              <motion.div 
                variants={scaleInVariants}
                whileHover={{ scale: 1.05 }}
                className={`relative p-6 ${getThemeClasses.card} rounded-lg shadow-sm transition-all duration-200`}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`h-12 w-12 rounded-md ${getThemeClasses.button} flex items-center justify-center mb-4`}
                >
                  <FaMobileAlt className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h3 className={`text-xl font-bold ${getThemeClasses.text}`}>Mobile Access</h3>
                <p className={`mt-2 ${getThemeClasses.subtext}`}>
                  Access your workouts anywhere with our mobile-friendly design
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className={`${getThemeClasses.background} border-t ${getThemeClasses.border}`}
      >
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 
              variants={fadeInUpVariants}
              className={`text-3xl font-extrabold ${getThemeClasses.text} sm:text-4xl`}
            >
              Ready to start your fitness journey?
            </motion.h2>
            <motion.p 
              variants={fadeInUpVariants}
              className={`mt-4 text-lg ${getThemeClasses.subtext}`}
            >
              Join FitFlow today and take the first step towards achieving your fitness goals.
            </motion.p>
            <motion.div 
              variants={fadeInUpVariants}
              className="mt-8"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/auth/signup"
                className={`inline-flex px-8 py-3 rounded-md shadow-sm font-medium text-base ${getThemeClasses.button}`}
              >
                Create Free Account
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
} 