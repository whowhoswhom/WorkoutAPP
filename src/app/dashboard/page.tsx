import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import WorkoutPlanSelector from '@/components/WorkoutPlanSelector'
import WorkoutLog from '@/components/WorkoutLog'
import AIChatbotPanel from '@/components/AIChatbotPanel'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {session.user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WorkoutPlanSelector />
        <WorkoutLog />
        <AIChatbotPanel />
      </div>
    </div>
  )
} 