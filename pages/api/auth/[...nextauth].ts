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
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('Sign in callback:', { 
        user, 
        accountProvider: account?.provider,
        profileEmail: profile?.email,
        callbackUrl: account?.callbackUrl,
        baseUrl: process.env.NEXTAUTH_URL
      })
      
      if (account?.provider === 'google') {
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
          console.error('SignIn error details:', error)
          return false
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl })
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
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
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions) 