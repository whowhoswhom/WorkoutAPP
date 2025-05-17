import { supabase } from './supabase'
import type { WorkoutLog } from './supabase'
import { logError } from './logger'

export async function createWorkoutLog(
  userId: string,
  data: Omit<WorkoutLog, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<WorkoutLog> {
  try {
    const { data: log, error } = await supabase
      .from('workout_logs')
      .insert({
        ...data,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error
    return log
  } catch (error) {
    logError('lib/workout-log.ts', 'createWorkoutLog', error)
    throw error
  }
}

export async function getWorkoutLogsByDate(
  userId: string,
  date: string
): Promise<WorkoutLog[]> {
  try {
    const { data, error } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  } catch (error) {
    logError('lib/workout-log.ts', 'getWorkoutLogsByDate', error)
    throw error
  }
}

export async function updateWorkoutLog(
  logId: string,
  data: Partial<Omit<WorkoutLog, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<WorkoutLog> {
  try {
    const { data: log, error } = await supabase
      .from('workout_logs')
      .update(data)
      .eq('id', logId)
      .select()
      .single()

    if (error) throw error
    return log
  } catch (error) {
    logError('lib/workout-log.ts', 'updateWorkoutLog', error)
    throw error
  }
}

export async function deleteWorkoutLog(logId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('workout_logs')
      .delete()
      .eq('id', logId)

    if (error) throw error
  } catch (error) {
    logError('lib/workout-log.ts', 'deleteWorkoutLog', error)
    throw error
  }
}
