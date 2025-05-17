import { logError } from './logger'

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL!

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface DeepSeekResponse {
  choices: {
    message: {
      content: string
      role: string
    }
  }[]
}

export async function generateWorkoutPlan(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert fitness trainer and workout program designer. Create detailed, safe, and effective workout plans based on user requirements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate workout plan')
    }

    const data: DeepSeekResponse = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    logError('deepseek.ts', 'generateWorkoutPlan', error)
    throw error
  }
}

export async function chatWithAI(messages: DeepSeekMessage[]): Promise<string> {
  try {
    const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert fitness trainer and workout program designer. Provide helpful advice, form corrections, and program adjustments based on user questions.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get AI response')
    }

    const data: DeepSeekResponse = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    logError('deepseek.ts', 'chatWithAI', error)
    throw error
  }
}
