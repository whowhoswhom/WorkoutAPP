# WorkoutApp

A modern web application for tracking workouts and fitness progress, built with Next.js, React, and Supabase.

## Features

- User Authentication (Email, Google, GitHub, Microsoft)
- Dark/Light Theme Support
- Responsive Design
- Secure API Integration
- PostgreSQL Database with Supabase

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, Supabase
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL (Supabase)
- **Styling:** TailwindCSS, Framer Motion

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd WorkoutApp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your environment variables:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 