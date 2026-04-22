import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme')
    const VALID: Theme[] = ['light', 'dark', 'system']
    return VALID.includes(stored as Theme) ? (stored as Theme) : 'system'
  })

  useEffect(() => {
    const root = document.documentElement
    localStorage.setItem('theme', theme)
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    root.classList.toggle('dark', isDark)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? '#030712' : '#f9fafb')
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches)
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', e.matches ? '#030712' : '#f9fafb')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  return { theme, setTheme: setThemeState }
}
