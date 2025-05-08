import Link from 'next/link'

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">Page not found</h2>
        <p className="text-yellow-700 mb-4">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
} 