import { NextResponse } from 'next/server'
import { chatWithAI, DeepSeekMessage } from '@/lib/deepseek'

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
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
} 