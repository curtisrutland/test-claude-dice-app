import type { RollEntry } from '../types'
import { formatDice } from '../utils'
import { DICE_COLORS } from '../diceColors'

interface Props {
  roll: RollEntry
}

export default function RollResult({ roll }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
      <p className="text-sm text-gray-500">{formatDice(roll.dice)}</p>
      <div className="flex flex-wrap gap-2">
        {roll.dice.map((sides, i) => {
          const c = DICE_COLORS[sides]
          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-center w-14 h-16 rounded-lg ${c.tileBg}`}
            >
              <span className={`text-xs font-medium ${c.tileLabel}`}>d{sides}</span>
              <span className={`font-bold text-lg ${c.tileValue}`}>{roll.results[i]}</span>
            </div>
          )
        })}
      </div>
      <p className="text-2xl font-bold text-gray-900">Total: {roll.total}</p>
    </div>
  )
}
