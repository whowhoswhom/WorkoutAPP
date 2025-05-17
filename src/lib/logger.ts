export function logError(file: string, fn: string, error: unknown) {
  const timestamp = new Date().toISOString()
  const message = `[${timestamp}] ${file}#${fn}: ${String(error)}`

  // Always log to the server console for visibility during development
  console.error(message)

  // Optionally forward the error to an external logging endpoint
  if (process.env.LOGGING_ENDPOINT) {
    fetch(process.env.LOGGING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    }).catch(err => {
      console.error('Failed to send error to logging service:', err)
    })
  }
}
