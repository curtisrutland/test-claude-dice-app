import { DICE_TYPES, type DieType } from '../types'
import { DICE_COLORS } from '../diceColors'
import { formatDiceExpression } from '../utils'

interface Props {
  selectedDice: DieType[]
  onAddDie: (sides: DieType) => void
  onRemoveDie: (index: number) => void
  onClear: () => void
  onRoll: () => void
}

export default function DicePicker({
  selectedDice,
  onAddDie,
  onRemoveDie,
  onClear,
  onRoll,
}: Props) {
  const rollLabel =
    selectedDice.length > 0
      ? `Roll ${selectedDice.length} ${selectedDice.length === 1 ? 'die' : 'dice'}`
      : 'Roll dice'

  return (
    <section
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 space-y-4"
      aria-label="Dice picker"
    >
      <div>
        <p
          id="dice-select-label"
          className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide"
        >
          Select dice
        </p>
        <div role="group" aria-labelledby="dice-select-label" className="flex flex-wrap gap-2">
          {DICE_TYPES.map((sides) => {
            const c = DICE_COLORS[sides]
            return (
              <button
                key={sides}
                onClick={() => onAddDie(sides)}
                aria-label={`Add d${sides}`}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${c.buttonBg} ${c.buttonText} ${c.buttonHover}`}
              >
                d{sides}
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-h-10">
        {selectedDice.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 py-1">
            No dice selected — click above to add
          </p>
        ) : (
          <ul aria-label="Selected dice" className="flex flex-wrap gap-2 items-center list-none">
            {selectedDice.map((sides, i) => {
              const c = DICE_COLORS[sides]
              return (
                <li key={`${sides}-${i}`}>
                  <button
                    onClick={() => onRemoveDie(i)}
                    aria-label={`Remove d${sides}`}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${c.buttonBg} ${c.buttonText} hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-200`}
                  >
                    d{sides} ×
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRoll}
          disabled={selectedDice.length === 0}
          aria-label={rollLabel}
          aria-disabled={selectedDice.length === 0}
          className="px-6 py-2 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Roll
        </button>
        {selectedDice.length > 0 && (
          <>
            <span
              aria-label={`Dice expression: ${formatDiceExpression(selectedDice)}`}
              className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              {formatDiceExpression(selectedDice)}
            </span>
            <button
              onClick={onClear}
              aria-label="Clear all selected dice"
              className="px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </>
        )}
      </div>
    </section>
  )
}
