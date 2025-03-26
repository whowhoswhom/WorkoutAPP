import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaDumbbell, FaRunning, FaHeartbeat, FaWeight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

interface Goal {
  type: 'strength' | 'endurance' | 'health' | 'weight';
  description: string;
  target: string;
  timeframe: string;
}

export default function Goals() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Goal>({
    type: 'strength',
    description: '',
    target: '',
    timeframe: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-white">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return null;
  }

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setGoals([...goals, newGoal]);
    setNewGoal({
      type: 'strength',
      description: '',
      target: '',
      timeframe: '',
    });
  };

  const handleDeleteGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const getGoalIcon = (type: Goal['type']) => {
    switch (type) {
      case 'strength':
        return <FaDumbbell className="w-6 h-6" />;
      case 'endurance':
        return <FaRunning className="w-6 h-6" />;
      case 'health':
        return <FaHeartbeat className="w-6 h-6" />;
      case 'weight':
        return <FaWeight className="w-6 h-6" />;
      default:
        return null;
    }
  };

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

        <div className="relative min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                What are your Goals?
              </h1>
              <p className="text-lg text-gray-300">
                Set your fitness goals and track your progress
              </p>
            </motion.div>

            {/* Add New Goal Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Add New Goal
              </h2>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Goal Type
                  </label>
                  <select
                    value={newGoal.type}
                    onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as Goal['type'] })}
                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="strength">Strength</option>
                    <option value="endurance">Endurance</option>
                    <option value="health">Health</option>
                    <option value="weight">Weight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
                    placeholder="e.g., Increase bench press weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Target
                  </label>
                  <input
                    type="text"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
                    placeholder="e.g., 225 lbs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Timeframe
                  </label>
                  <input
                    type="text"
                    value={newGoal.timeframe}
                    onChange={(e) => setNewGoal({ ...newGoal, timeframe: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
                    placeholder="e.g., 3 months"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-blue-500/25"
                >
                  Add Goal
                </motion.button>
              </form>
            </motion.div>

            {/* Goals List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Your Goals
              </h2>
              {goals.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No goals set yet. Add your first goal above!
                </p>
              ) : (
                <div className="space-y-4">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start justify-between p-4 bg-gray-700/50 backdrop-blur-sm rounded-lg"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-blue-400">{getGoalIcon(goal.type)}</div>
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)}
                          </h3>
                          <p className="text-gray-300">{goal.description}</p>
                          <div className="mt-2 text-sm text-gray-400">
                            <p>Target: {goal.target}</p>
                            <p>Timeframe: {goal.timeframe}</p>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteGoal(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </>
    </Layout>
  );
} 