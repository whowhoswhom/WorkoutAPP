import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const { name, description, date, duration } = req.body

    if (!name || !date || !duration) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const { data: workout, error } = await supabase
      .from('workouts')
      .insert([
        {
          user_id: session.user.id,
          name,
          description,
          date,
          duration
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating workout:', error)
      return res.status(400).json({ message: error.message })
    }

    return res.status(201).json(workout)
  } catch (error) {
    console.error('Error in create workout API:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
} 