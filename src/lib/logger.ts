export function logError(file: string, fn: string, error: unknown) {
  const timestamp = new Date().toISOString()
  const message = `[${timestamp}] ${file}#${fn}: ${String(error)}\n`
  
  // If running on the server, attempt to append to the log file.
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs') as typeof import('fs')
      const path = require('path') as typeof import('path')
      const logPath = path.join(process.cwd(), 'logs', 'debug.md')
      fs.appendFileSync(logPath, message)
    } catch (err) {
      console.error('Failed to write to log file:', err)
    }
    return
  }

  // Fallback for client-side execution
  console.error(message.trim())
}