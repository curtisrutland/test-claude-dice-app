interface DiceColors {
  buttonBg: string
  buttonText: string
  buttonHover: string
  tileBg: string
  tileLabel: string
  tileValue: string
}

export const DICE_COLORS: Record<number, DiceColors> = {
  4:   { buttonBg: 'bg-rose-100 dark:bg-rose-900',   buttonText: 'text-rose-800 dark:text-rose-200',   buttonHover: 'hover:bg-rose-200 dark:hover:bg-rose-800',   tileBg: 'bg-rose-50 dark:bg-rose-900/40',   tileLabel: 'text-rose-400 dark:text-rose-400',   tileValue: 'text-rose-900 dark:text-rose-100'   },
  6:   { buttonBg: 'bg-orange-100 dark:bg-orange-900', buttonText: 'text-orange-800 dark:text-orange-200', buttonHover: 'hover:bg-orange-200 dark:hover:bg-orange-800', tileBg: 'bg-orange-50 dark:bg-orange-900/40', tileLabel: 'text-orange-400 dark:text-orange-400', tileValue: 'text-orange-900 dark:text-orange-100' },
  8:   { buttonBg: 'bg-amber-100 dark:bg-amber-900',  buttonText: 'text-amber-800 dark:text-amber-200',  buttonHover: 'hover:bg-amber-200 dark:hover:bg-amber-800',  tileBg: 'bg-amber-50 dark:bg-amber-900/40',  tileLabel: 'text-amber-400 dark:text-amber-400',  tileValue: 'text-amber-900 dark:text-amber-100'  },
  10:  { buttonBg: 'bg-lime-100 dark:bg-lime-900',   buttonText: 'text-lime-800 dark:text-lime-200',   buttonHover: 'hover:bg-lime-200 dark:hover:bg-lime-800',   tileBg: 'bg-lime-50 dark:bg-lime-900/40',   tileLabel: 'text-lime-400 dark:text-lime-400',   tileValue: 'text-lime-900 dark:text-lime-100'   },
  12:  { buttonBg: 'bg-teal-100 dark:bg-teal-900',   buttonText: 'text-teal-800 dark:text-teal-200',   buttonHover: 'hover:bg-teal-200 dark:hover:bg-teal-800',   tileBg: 'bg-teal-50 dark:bg-teal-900/40',   tileLabel: 'text-teal-400 dark:text-teal-400',   tileValue: 'text-teal-900 dark:text-teal-100'   },
  20:  { buttonBg: 'bg-blue-100 dark:bg-blue-900',   buttonText: 'text-blue-800 dark:text-blue-200',   buttonHover: 'hover:bg-blue-200 dark:hover:bg-blue-800',   tileBg: 'bg-blue-50 dark:bg-blue-900/40',   tileLabel: 'text-blue-400 dark:text-blue-400',   tileValue: 'text-blue-900 dark:text-blue-100'   },
  100: { buttonBg: 'bg-violet-100 dark:bg-violet-900', buttonText: 'text-violet-800 dark:text-violet-200', buttonHover: 'hover:bg-violet-200 dark:hover:bg-violet-800', tileBg: 'bg-violet-50 dark:bg-violet-900/40', tileLabel: 'text-violet-400 dark:text-violet-400', tileValue: 'text-violet-900 dark:text-violet-100' },
}
