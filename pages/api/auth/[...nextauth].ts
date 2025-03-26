import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { supabase } from '../../../lib/supabase'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      provider?: string
    }
  }
  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    provider?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    accessToken?: string
    provider?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@domain.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        try {
          const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            console.error('Supabase auth error:', error)
            throw new Error(error.message)
          }

          if (!user?.email) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name,
            image: user.user_metadata?.avatar_url,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('SignIn callback:', { user, account })
      // Always allow sign in - we'll handle user creation in the session callback
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl })
      // Always allow redirects to the home page
      if (url === baseUrl || url === `${baseUrl}/`) {
        return url
      }
      // Allow all redirects in development
      if (process.env.NODE_ENV === 'development') {
        return url
      }
      // If the url is relative, prefix it with the base url
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // If the url is on the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url
      }
      // Otherwise, redirect to the home page
      return baseUrl
    },
    async jwt({ token, user, account }) {
      console.log('JWT callback:', { token, user, account })
      if (account && user) {
        token.accessToken = account.access_token
        token.userId = user.id
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token })
      if (session.user) {
        session.user.id = token.sub || token.userId // Use sub as fallback
        session.user.provider = token.provider
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true, // Always enable debug mode for troubleshooting
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions) 