import type { RollEntry } from '../types'
import { formatDice } from '../utils'
import { DICE_COLORS } from '../diceColors'

interface Props {
  roll: RollEntry
}

export default function RollResult({ roll }: Props) {
  return (
    <section
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 space-y-3"
      aria-label="Roll result"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDice(roll.dice)}</p>
      <div role="list" className="flex flex-wrap gap-2" aria-label="Individual results">
        {roll.dice.map((sides, i) => {
          const c = DICE_COLORS[sides]
          return (
            <div
              key={i}
              role="listitem"
              aria-label={`d${sides}: ${roll.results[i]}`}
              className={`flex flex-col items-center justify-center w-14 h-16 rounded-lg ${c.tileBg}`}
            >
              <span className={`text-xs font-medium ${c.tileLabel}`} aria-hidden="true">d{sides}</span>
              <span className={`font-bold text-lg ${c.tileValue}`} aria-hidden="true">{roll.results[i]}</span>
            </div>
          )
        })}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">Total: {roll.total}</p>
    </section>
  )
}
