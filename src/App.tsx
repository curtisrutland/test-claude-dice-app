import { useState } from 'react'
import type { RollEntry } from './types'
import { useRollHistory } from './hooks/useRollHistory'
import DicePicker from './components/DicePicker'
import RollResult from './components/RollResult'
import RollHistory from './components/RollHistory'

function App() {
  const [selectedDice, setSelectedDice] = useState<number[]>([])
  const [currentRoll, setCurrentRoll] = useState<RollEntry | null>(null)
  const { history, addRoll, clearHistory } = useRollHistory()

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dice Roller</h1>
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
