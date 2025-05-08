export default function AuthLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-4">
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
} 