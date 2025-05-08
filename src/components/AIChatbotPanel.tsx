export default function AIChatbotPanel() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Chatbot</h2>
      <p className="text-gray-600">Ask me anything about your fitness journey.</p>
      <input
        type="text"
        placeholder="Ask me anything..."
        className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
        Send
      </button>
      {/* Add AI chatbot logic here */}
    </div>
  )
} 