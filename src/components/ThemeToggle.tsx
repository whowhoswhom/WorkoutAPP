'use client'

import { useState, useEffect } from 'react'

const themes = ['light', 'grey', 'dark'] as const
export type Theme = typeof themes[number]

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

  return (
    <button onClick={handleClick} className="text-gray-600 hover:text-gray-900" aria-label="Toggle theme">
      {themes[index].charAt(0).toUpperCase() + themes[index].slice(1)}
    </button>
  )
}
