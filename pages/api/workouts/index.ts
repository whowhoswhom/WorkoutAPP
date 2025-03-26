import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const { name, description, type, duration, difficulty } = req.body

      const { data, error } = await supabase
        .from('workouts')
        .insert([
          {
            name,
            description,
            type,
            duration: parseInt(duration),
            difficulty,
            user_id: session.user.id,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        throw error
      }

      return res.status(201).json(data)
    } catch (error) {
      console.error('Error creating workout:', error)
      return res.status(500).json({ error: 'Error creating workout' })
    }
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching workouts:', error)
      return res.status(500).json({ error: 'Error fetching workouts' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
} 