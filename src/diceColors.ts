interface DiceColors {
  buttonBg: string
  buttonText: string
  buttonHover: string
  tileBg: string
  tileLabel: string
  tileValue: string
}

export const DICE_COLORS: Record<number, DiceColors> = {
  4:   { buttonBg: 'bg-rose-100',   buttonText: 'text-rose-800',   buttonHover: 'hover:bg-rose-200',   tileBg: 'bg-rose-50',   tileLabel: 'text-rose-400',   tileValue: 'text-rose-900'   },
  6:   { buttonBg: 'bg-orange-100', buttonText: 'text-orange-800', buttonHover: 'hover:bg-orange-200', tileBg: 'bg-orange-50', tileLabel: 'text-orange-400', tileValue: 'text-orange-900' },
  8:   { buttonBg: 'bg-amber-100',  buttonText: 'text-amber-800',  buttonHover: 'hover:bg-amber-200',  tileBg: 'bg-amber-50',  tileLabel: 'text-amber-400',  tileValue: 'text-amber-900'  },
  10:  { buttonBg: 'bg-lime-100',   buttonText: 'text-lime-800',   buttonHover: 'hover:bg-lime-200',   tileBg: 'bg-lime-50',   tileLabel: 'text-lime-400',   tileValue: 'text-lime-900'   },
  12:  { buttonBg: 'bg-teal-100',   buttonText: 'text-teal-800',   buttonHover: 'hover:bg-teal-200',   tileBg: 'bg-teal-50',   tileLabel: 'text-teal-400',   tileValue: 'text-teal-900'   },
  20:  { buttonBg: 'bg-blue-100',   buttonText: 'text-blue-800',   buttonHover: 'hover:bg-blue-200',   tileBg: 'bg-blue-50',   tileLabel: 'text-blue-400',   tileValue: 'text-blue-900'   },
  100: { buttonBg: 'bg-violet-100', buttonText: 'text-violet-800', buttonHover: 'hover:bg-violet-200', tileBg: 'bg-violet-50', tileLabel: 'text-violet-400', tileValue: 'text-violet-900' },
}
