import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only show if GitHub ID exists, not the full secret
  const hasGithubId = !!process.env.GITHUB_ID
  const githubIdFirstChars = process.env.GITHUB_ID?.substring(0, 4)
  
  res.status(200).json({
    nextauth_url: process.env.NEXTAUTH_URL,
    has_github_id: hasGithubId,
    github_id_starts_with: githubIdFirstChars,
    // Do not expose full credentials
  })
} 