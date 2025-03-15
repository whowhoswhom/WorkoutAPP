import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import MicrosoftProvider from 'next-auth/providers/azure-ad'
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
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.MICROSOFT_TENANT_ID,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'github' || account?.provider === 'azure-ad') {
        try {
          const { data: existingUser, error: lookupError } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single()

          if (lookupError && lookupError.code !== 'PGRST116') {
            console.error('Error looking up user:', lookupError)
            return false
          }

          if (!existingUser) {
            const { error: createError } = await supabase.from('users').insert([
              {
                email: user.email,
                name: user.name,
                avatar_url: user.image,
                provider: account.provider,
              },
            ])

            if (createError) {
              console.error('Error creating user:', createError)
              return false
            }
          }
        } catch (error) {
          console.error('SignIn error:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.userId = user.id
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId
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
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions) 