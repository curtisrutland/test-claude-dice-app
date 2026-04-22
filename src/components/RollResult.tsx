import type { RollEntry } from '../types'
import { formatDice } from '../utils'

interface Props {
  roll: RollEntry
}

export default function RollResult({ roll }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
      <p className="text-sm text-gray-500">{formatDice(roll.dice)}</p>
      <div className="flex flex-wrap gap-2">
        {roll.dice.map((sides, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center w-14 h-16 rounded-lg bg-indigo-50 text-indigo-900"
          >
            <span className="text-xs text-indigo-400 font-medium">d{sides}</span>
            <span className="font-bold text-lg">{roll.results[i]}</span>
          </div>
        ))}
      </div>
      <p className="text-2xl font-bold text-gray-900">Total: {roll.total}</p>
    </div>
  )
}
