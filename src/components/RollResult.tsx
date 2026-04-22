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

function natClass(sides: number, result: number, highlight: boolean): 'nat20' | 'nat1' | null {
  if (!highlight || sides !== 20) return null
  if (result === 20) return 'nat20'
  if (result === 1) return 'nat1'
  return null
}

const NAT20_BG = 'bg-yellow-100 dark:bg-yellow-900/50'
const NAT20_VALUE = 'text-yellow-700 dark:text-yellow-300'
const NAT1_BG = 'bg-red-100 dark:bg-red-900/50'
const NAT1_VALUE = 'text-red-700 dark:text-red-300'

export default function RollResult({ roll }: Props) {
  const dropped = discardedIndex(roll.results, roll.rollType)
  const isAdvDisadv = roll.rollType !== undefined
  const highlightNats = isAdvDisadv || (roll.dice.length === 1 && roll.dice[0] === 20)

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
          const nat = natClass(sides, roll.results[i], highlightNats)
          const bgClass = nat === 'nat20' ? NAT20_BG : nat === 'nat1' ? NAT1_BG : c.tileBg
          const valueClass =
            nat === 'nat20' ? NAT20_VALUE : nat === 'nat1' ? NAT1_VALUE : c.tileValue
          const natLabel = nat === 'nat20' ? ' (natural 20)' : nat === 'nat1' ? ' (natural 1)' : ''
          return (
            <div
              key={`${sides}-${i}`}
              role="listitem"
              aria-label={`d${sides}: ${roll.results[i]}${natLabel}${isDropped ? ' (discarded)' : ''}`}
              className={`flex flex-col items-center justify-center w-14 h-16 rounded-lg ${bgClass} ${isDropped ? 'opacity-40' : ''}`}
            >
              <span className={`text-xs font-medium ${c.tileLabel}`} aria-hidden="true">
                d{sides}
              </span>
              <span
                className={`font-bold text-lg ${valueClass} ${isDropped ? 'line-through' : ''}`}
                aria-hidden="true"
              >
                {roll.results[i]}
              </span>
            </div>
          )
        })}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {isAdvDisadv ? 'Result' : 'Total'}: {roll.total}
      </p>
    </section>
  )
}
