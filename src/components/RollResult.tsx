import type { RollEntry, RollType } from '../types'
import { formatRollLabel } from '../utils'
import { DICE_COLORS } from '../diceColors'

interface Props {
  roll: RollEntry
}

function discardedIndex(results: number[], rollType: RollType | undefined): number | null {
  if (rollType !== 'advantage' && rollType !== 'disadvantage') return null
  if (results.length !== 2 || results[0] === results[1]) return null
  return rollType === 'advantage'
    ? results[0] > results[1]
      ? 1
      : 0
    : results[0] < results[1]
      ? 1
      : 0
}

export default function RollResult({ roll }: Props) {
  const dropped = discardedIndex(roll.results, roll.rollType)

  return (
    <section
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 space-y-3"
      aria-label="Roll result"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {formatRollLabel(roll.dice, roll.rollType)}
      </p>
      <div role="list" className="flex flex-wrap gap-2" aria-label="Individual results">
        {roll.dice.map((sides, i) => {
          const c = DICE_COLORS[sides]
          const isDropped = dropped === i
          return (
            <div
              key={`${sides}-${i}`}
              role="listitem"
              aria-label={`d${sides}: ${roll.results[i]}${isDropped ? ' (discarded)' : ''}`}
              className={`flex flex-col items-center justify-center w-14 h-16 rounded-lg ${c.tileBg} ${isDropped ? 'opacity-40' : ''}`}
            >
              <span className={`text-xs font-medium ${c.tileLabel}`} aria-hidden="true">
                d{sides}
              </span>
              <span
                className={`font-bold text-lg ${c.tileValue} ${isDropped ? 'line-through' : ''}`}
                aria-hidden="true"
              >
                {roll.results[i]}
              </span>
            </div>
          )
        })}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {roll.rollType === 'advantage' || roll.rollType === 'disadvantage' ? 'Result' : 'Total'}:{' '}
        {roll.total}
      </p>
    </section>
  )
}
