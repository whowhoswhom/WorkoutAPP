import Link from 'next/link'

export default function AuthNotFound() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">Page not found</h2>
        <p className="text-yellow-700 mb-4">The page you're looking for doesn't exist.</p>
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </div>
  )
} 