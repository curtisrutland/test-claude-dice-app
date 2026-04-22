import { DICE_TYPES } from '../types'
import { DICE_COLORS } from '../diceColors'

interface Props {
  selectedDice: number[]
  onAddDie: (sides: number) => void
  onRemoveDie: (index: number) => void
  onClear: () => void
  onRoll: () => void
}

export default function DicePicker({ selectedDice, onAddDie, onRemoveDie, onClear, onRoll }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 space-y-4">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Select dice</p>
        <div className="flex flex-wrap gap-2">
          {DICE_TYPES.map(sides => {
            const c = DICE_COLORS[sides]
            return (
              <button
                key={sides}
                onClick={() => onAddDie(sides)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${c.buttonBg} ${c.buttonText} ${c.buttonHover}`}
              >
                d{sides}
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-h-10 flex flex-wrap gap-2 items-center">
        {selectedDice.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">No dice selected — click above to add</p>
        ) : (
          selectedDice.map((sides, i) => {
            const c = DICE_COLORS[sides]
            return (
              <button
                key={i}
                onClick={() => onRemoveDie(i)}
                title="Click to remove"
                className={`px-3 py-1 rounded-full text-sm transition-colors ${c.buttonBg} ${c.buttonText} hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900 dark:hover:text-red-300`}
              >
                d{sides} ×
              </button>
            )
          })
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRoll}
          disabled={selectedDice.length === 0}
          className="px-6 py-2 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Roll{selectedDice.length > 0 ? ` (${selectedDice.length})` : ''}
        </button>
        {selectedDice.length > 0 && (
          <button
            onClick={onClear}
            className="px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
