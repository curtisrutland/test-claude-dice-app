import { useState } from 'react'
import type { DieType, RollEntry, RollType } from './types'
import { useRollHistory } from './hooks/useRollHistory'
import { useTheme } from './hooks/useTheme'
import { formatDice } from './utils'
import DicePicker from './components/DicePicker'
import RollResult from './components/RollResult'
import RollHistory from './components/RollHistory'
import ThemeToggle from './components/ThemeToggle'
import SiteFooter from './components/SiteFooter'

function rollAnnouncement(roll: RollEntry): string {
  if (roll.rollType === 'advantage' || roll.rollType === 'disadvantage') {
    const label = roll.rollType === 'advantage' ? 'Advantage' : 'Disadvantage'
    return `${label} d20: rolled ${roll.results[0]} and ${roll.results[1]}. Kept: ${roll.total}.`
  }
  const parts = roll.dice.map((s, i) => `d${s}: ${roll.results[i]}`)
  return `Rolled ${formatDice(roll.dice)}. ${parts.join(', ')}. Total: ${roll.total}.`
}

function App() {
  const [selectedDice, setSelectedDice] = useState<DieType[]>([])
  const [currentRoll, setCurrentRoll] = useState<RollEntry | null>(null)
  const { history, addRoll, clearHistory } = useRollHistory()
  const { theme, setTheme } = useTheme()

  function addDie(sides: DieType) {
    setSelectedDice((prev) => [...prev, sides].sort((a, b) => b - a))
  }

  function removeDie(index: number) {
    setSelectedDice((prev) => prev.filter((_, i) => i !== index))
  }

  function rollDice(dice: DieType[]) {
    const results = dice.map((sides) => Math.floor(Math.random() * sides) + 1)
    const entry: RollEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      dice: [...dice],
      results,
      total: results.reduce((a, b) => a + b, 0),
    }
    setCurrentRoll(entry)
    addRoll(entry)
  }

  function rollAdvantage(type: Exclude<RollType, 'normal'>) {
    const r1 = Math.floor(Math.random() * 20) + 1
    const r2 = Math.floor(Math.random() * 20) + 1
    const total = type === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2)
    const entry: RollEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      dice: [20, 20],
      results: [r1, r2],
      total,
      rollType: type,
    }
    setCurrentRoll(entry)
    addRoll(entry)
  }

  function reroll(dice: DieType[], rollType?: RollType) {
    if (rollType === 'advantage' || rollType === 'disadvantage') {
      rollAdvantage(rollType)
    } else {
      rollDice(dice)
    }
  }

  function roll() {
    if (selectedDice.length === 0) return
    rollDice(selectedDice)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Persistent live region — always in DOM so screen readers catch updates */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {currentRoll && rollAnnouncement(currentRoll)}
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dice Roller</h1>
            <ThemeToggle theme={theme} onChange={setTheme} />
          </header>
          <DicePicker
            selectedDice={selectedDice}
            onAddDie={addDie}
            onRemoveDie={removeDie}
            onClear={() => setSelectedDice([])}
            onRoll={roll}
            onAdvantageRoll={rollAdvantage}
          />
          {currentRoll && <RollResult roll={currentRoll} />}
          <RollHistory history={history} onClear={clearHistory} onReroll={reroll} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
