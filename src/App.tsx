import { useState } from 'react'
import type { RollEntry } from './types'
import { useRollHistory } from './hooks/useRollHistory'
import { useTheme } from './hooks/useTheme'
import DicePicker from './components/DicePicker'
import RollResult from './components/RollResult'
import RollHistory from './components/RollHistory'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [selectedDice, setSelectedDice] = useState<number[]>([])
  const [currentRoll, setCurrentRoll] = useState<RollEntry | null>(null)
  const { history, addRoll, clearHistory } = useRollHistory()
  const { theme, setTheme } = useTheme()

  function addDie(sides: number) {
    setSelectedDice(prev => [...prev, sides])
  }

  function removeDie(index: number) {
    setSelectedDice(prev => prev.filter((_, i) => i !== index))
  }

  function roll() {
    if (selectedDice.length === 0) return
    const results = selectedDice.map(sides => Math.floor(Math.random() * sides) + 1)
    const entry: RollEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      dice: [...selectedDice],
      results,
      total: results.reduce((a, b) => a + b, 0),
    }
    setCurrentRoll(entry)
    addRoll(entry)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 transition-colors">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dice Roller</h1>
          <ThemeToggle theme={theme} onChange={setTheme} />
        </div>
        <DicePicker
          selectedDice={selectedDice}
          onAddDie={addDie}
          onRemoveDie={removeDie}
          onClear={() => setSelectedDice([])}
          onRoll={roll}
        />
        {currentRoll && <RollResult roll={currentRoll} />}
        <RollHistory history={history} onClear={clearHistory} />
      </div>
    </div>
  )
}

export default App
