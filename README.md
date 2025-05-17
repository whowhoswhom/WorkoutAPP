# 4Word Web App

A Next.js application for AI-powered guidance.

## Features

- User authentication with Supabase
- Google OAuth integration
- Protected routes
- Responsive design with Tailwind CSS
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
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
- Google OAuth

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 