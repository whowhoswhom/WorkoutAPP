import { appendFileSync } from 'fs'
import path from 'path'

export function logError(file: string, fn: string, error: unknown) {
  const timestamp = new Date().toISOString()
  const message = `[${timestamp}] ${file}#${fn}: ${String(error)}\n`
  const logPath = path.join(process.cwd(), 'logs', 'debug.md')
  try {
    appendFileSync(logPath, message)
  } catch (err) {
    console.error('Failed to write to log file:', err)
  }
}
