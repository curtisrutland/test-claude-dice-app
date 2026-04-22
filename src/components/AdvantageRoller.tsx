import type { RollType } from '../types'

interface Props {
  onRoll: (type: Exclude<RollType, 'normal'>) => void
}

export default function AdvantageRoller({ onRoll }: Props) {
  return (
    <section
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5"
      aria-label="Advantage and disadvantage roller"
    >
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
        d20 advantage / disadvantage
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => onRoll('advantage')}
          aria-label="Roll d20 with advantage (take the higher of two rolls)"
          className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 dark:hover:bg-emerald-800"
        >
          Advantage
        </button>
        <button
          onClick={() => onRoll('disadvantage')}
          aria-label="Roll d20 with disadvantage (take the lower of two rolls)"
          className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
        >
          Disadvantage
        </button>
      </div>
    </section>
  )
}
