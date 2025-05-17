import { NextResponse } from 'next/server'
import { generateWorkoutPlan } from '@/lib/deepseek'
import { logError } from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json() as { prompt: string }
    
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt format' },
        { status: 400 }
      )
    }

    const plan = await generateWorkoutPlan(prompt)
    return NextResponse.json({ plan })
  } catch (error) {
    logError('api/workout-plan/route.ts', 'POST', error)
    return NextResponse.json(
      { error: 'Failed to generate workout plan' },
      { status: 500 }
    )
  }
}
