import type { DieType, RollEntry, RollType } from '../types'
import { formatRollLabel, formatTime } from '../utils'

interface Props {
  history: RollEntry[]
  onClear: () => void
  onReroll: (dice: DieType[], rollType?: RollType) => void
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
          {history.map((entry) => {
            const isAdvDisadv = entry.rollType === 'advantage' || entry.rollType === 'disadvantage'
            const label = formatRollLabel(entry.dice, entry.rollType)
            const resultDetail = isAdvDisadv
              ? `d20: ${entry.results[0]}, d20: ${entry.results[1]}`
              : entry.dice.map((sides, i) => `d${sides}:${entry.results[i]}`).join(', ')
            const ariaLabel = isAdvDisadv
              ? `${label}. Rolled ${entry.results[0]} and ${entry.results[1]}. Kept: ${entry.total}.`
              : `${label}. ${resultDetail}. Total: ${entry.total}`
            return (
              <li key={entry.id} className="py-3" aria-label={ariaLabel}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                    {label}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {entry.total}
                    </span>
                    <button
                      onClick={() => onReroll(entry.dice, entry.rollType)}
                      aria-label={`Reroll ${label}`}
                      title={`Reroll ${label}`}
                      className="text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors text-base leading-none"
                    >
                      <span aria-hidden="true">↺</span>
                    </button>
                  </div>
                </div>
                <div
                  className="flex flex-wrap items-center gap-x-2 mt-1 text-xs text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                >
                  <span>{formatTime(entry.timestamp)}</span>
                  <span>·</span>
                  <span>{resultDetail}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
