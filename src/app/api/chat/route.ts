import { NextResponse } from 'next/server'
import { chatWithAI, DeepSeekMessage } from '@/lib/deepseek'
import { logError } from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as { messages: DeepSeekMessage[] }
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    const response = await chatWithAI(messages)
    return NextResponse.json({ response })
  } catch (error) {
    logError('api/chat/route.ts', 'POST', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
