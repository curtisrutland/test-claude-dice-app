import type { RollEntry } from '../types'
import { formatDice, formatTime } from '../utils'

interface Props {
  history: RollEntry[]
  onClear: () => void
}

export default function RollHistory({ history, onClear }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">
          Roll History{history.length > 0 ? ` (${history.length})` : ''}
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-sm text-gray-400">No rolls yet.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {history.map(entry => (
            <li key={entry.id} className="py-2 flex items-center gap-4 text-sm">
              <span className="text-gray-400 w-20 shrink-0">{formatTime(entry.timestamp)}</span>
              <span className="text-gray-600 flex-1">{formatDice(entry.dice)}</span>
              <span className="text-gray-400 text-xs">[{entry.results.join(', ')}]</span>
              <span className="font-semibold text-gray-900 w-8 text-right">{entry.total}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
