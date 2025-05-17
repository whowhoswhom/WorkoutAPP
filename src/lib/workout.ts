import { supabase } from './supabase'
import type { WorkoutPlan, Exercise } from './supabase'
import { logError } from './logger'

export async function generateWorkoutPlan(
  userId: string,
  params: {
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    duration: number
    goals: string[]
  }
): Promise<WorkoutPlan> {
  try {
    // Create the workout plan
    const { data: plan, error: planError } = await supabase
      .from('workout_plans')
      .insert({
        name: `${params.difficulty.charAt(0).toUpperCase() + params.difficulty.slice(1)} ${params.duration}-Week Plan`,
        description: `AI-generated ${params.difficulty} workout plan for ${params.goals.join(', ')}`,
        difficulty_level: params.difficulty,
        duration_weeks: params.duration,
        created_by: userId,
        is_ai_generated: true
      })
      .select()
      .single()

    if (planError) throw planError

    return plan
  } catch (error) {
    logError('lib/workout.ts', 'generateWorkoutPlan', error)
    throw error
  }
}

export async function getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('muscle_group', muscleGroup)

    if (error) throw error
    return data
  } catch (error) {
    logError('lib/workout.ts', 'getExercisesByMuscleGroup', error)
    throw error
  }
}

export async function getExercisesByDifficulty(difficulty: string): Promise<Exercise[]> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('difficulty_level', difficulty)

    if (error) throw error
    return data
  } catch (error) {
    logError('lib/workout.ts', 'getExercisesByDifficulty', error)
    throw error
  }
}
