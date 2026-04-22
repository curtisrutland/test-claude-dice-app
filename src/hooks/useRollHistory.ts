import { useState, useEffect } from 'react'
import type { RollEntry } from '../types'

const STORAGE_KEY = 'dice-roll-history'
const MAX_HISTORY = 100

export function useRollHistory() {
  const [history, setHistory] = useState<RollEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as RollEntry[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Failed to save roll history:', error)
    }
  }, [history])

  function addRoll(entry: RollEntry) {
    setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY))
  }

  function clearHistory() {
    setHistory([])
  }

  return { history, addRoll, clearHistory }
}
