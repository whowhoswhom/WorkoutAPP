import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type Exercise = {
  id: string
  name: string
  description: string | null
  muscle_group: string | null
  difficulty_level: string | null
  media_url: string | null
  created_at: string
  updated_at: string
}

export type WorkoutPlan = {
  id: string
  name: string
  description: string | null
  difficulty_level: string | null
  duration_weeks: number | null
  created_by: string | null
  is_ai_generated: boolean
  created_at: string
  updated_at: string
}

export type WorkoutLog = {
  id: string
  user_id: string
  workout_plan_id: string | null
  exercise_id: string | null
  sets: number | null
  reps: number | null
  weight: number | null
  notes: string | null
  date: string
  created_at: string
  updated_at: string
} 