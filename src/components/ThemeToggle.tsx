'use client'

import { useState, useEffect } from 'react'

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2m0 18v2m9-11h-2M5 12H3m15.364-8.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 17.95l-1.414-1.414M6.05 6.05L4.636 4.636" />
    </svg>
  )
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function CloudMoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
      <path d="M3 15a4 4 0 008 0h1a5 5 0 0010 0 5 5 0 00-9.33-2.67A5 5 0 003 15z" />
    </svg>
  )
}

const themes = ['light', 'dark', 'grey'] as const
export type Theme = typeof themes[number]

const icons = [SunIcon, MoonIcon, CloudMoonIcon]
const iconColors = ['text-yellow-500', 'text-black', 'text-gray-500']

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove('theme-light', 'theme-grey', 'theme-dark')
  document.documentElement.classList.add(`theme-${theme}`)
  localStorage.setItem('theme', theme)
}

export default function ThemeToggle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored && themes.includes(stored)) {
      const i = themes.indexOf(stored)
      setIndex(i)
      applyTheme(stored)
    } else {
      applyTheme(themes[0])
    }
  }, [])

  const handleClick = () => {
    const next = (index + 1) % themes.length
    setIndex(next)
    applyTheme(themes[next])
  }

  const Icon = icons[index]
  const color = iconColors[index]

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle theme"
      className={`p-2 ${color}`}
    >
      <Icon className="h-6 w-6" />
    </button>
  )
}
