# 4Word Web App

A Next.js application for AI-powered guidance.

## Features

- User authentication with Supabase
- Google OAuth integration via Supabase
- Protected routes
- Responsive design with Tailwind CSS
- Tailwind configuration written in TypeScript
- TypeScript support
- Error handling and loading states

## Getting Started

1. Ensure you have **Node.js 18 or higher** installed.
2. Clone the repository
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DEEPSEEK_API_URL=https://api.deepseek.com
   DEEPSEEK_API_KEY=your_deepseek_api_key
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setup

Configure Supabase OAuth redirect URLs so login works locally and in production.

1. In the Supabase dashboard, open **Authentication** → **URL Configuration**.
2. Under **Additional Redirect URLs**, whitelist the following URLs:
   - `http://localhost:3000/auth/callback`
   - `https://fitflow.cloud/auth/callback`

This allows Google OAuth to redirect users back to the correct environment.

## Setup

Configure Supabase OAuth redirect URLs so login works locally and in production.

1. In the Supabase dashboard, open **Authentication** → **URL Configuration**.
2. Under **Additional Redirect URLs**, whitelist the following URLs:
   - `http://localhost:3000/auth/callback`
   - `https://fitflow.cloud/auth/callback`

This allows Google OAuth to redirect users back to the correct environment.

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/
│   ├── dashboard/
│   └── layout.tsx
├── components/
│   ├── Navigation.tsx
│   └── SignOutButton.tsx
└── types/
    └── user.ts
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase
- Google OAuth provider (configured in Supabase dashboard)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request.
