import { NextResponse } from 'next/server'
import { generateWorkoutPlan } from '@/lib/deepseek'

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
    console.error('Workout plan API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate workout plan' },
      { status: 500 }
    )
  }
} 