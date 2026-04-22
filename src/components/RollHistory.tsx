import type { RollEntry } from '../types'
import { formatDice, formatTime } from '../utils'

interface Props {
  history: RollEntry[]
  onClear: () => void
  onReroll: (dice: number[]) => void
}

export default function RollHistory({ history, onClear, onReroll }: Props) {
  return (
    <section
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5"
      aria-labelledby="roll-history-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 id="roll-history-heading" className="font-semibold text-gray-900 dark:text-gray-100">
          Roll History{history.length > 0 ? ` (${history.length})` : ''}
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            aria-label="Clear all roll history"
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">No rolls yet.</p>
      ) : (
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {history.map(entry => {
            const diceSummary = formatDice(entry.dice)
            const resultDetail = entry.dice.map((sides, i) => `d${sides}: ${entry.results[i]}`).join(', ')
            return (
              <li
                key={entry.id}
                className="py-2 flex items-center gap-4 text-sm"
                aria-label={`${diceSummary}. ${resultDetail}. Total: ${entry.total}`}
              >
                <span className="text-gray-600 dark:text-gray-400 w-20 shrink-0" aria-hidden="true">
                  {formatTime(entry.timestamp)}
                </span>
                <span className="text-gray-600 dark:text-gray-300 flex-1" aria-hidden="true">
                  {diceSummary}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-xs" aria-hidden="true">
                  {entry.dice.map((sides, i) => `d${sides}:${entry.results[i]}`).join(', ')}
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 w-8 text-right" aria-hidden="true">
                  {entry.total}
                </span>
                <button
                  onClick={() => onReroll(entry.dice)}
                  aria-label={`Reroll ${diceSummary}`}
                  title={`Reroll ${diceSummary}`}
                  className="text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors text-base leading-none"
                >
                  <span aria-hidden="true">↺</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
