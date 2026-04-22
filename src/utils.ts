import type { DieType, RollType } from './types'

function buildDiceGroups(dice: DieType[]): string[] {
  const counts: Partial<Record<DieType, number>> = {}
  for (const d of dice) {
    counts[d] = (counts[d] ?? 0) + 1
  }
  return (Object.entries(counts) as [string, number][])
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([sides, count]) => `${count}d${sides}`)
}

export function formatDice(dice: DieType[]): string {
  return buildDiceGroups(dice).join(' + ')
}

export function formatDiceExpression(dice: DieType[]): string {
  return buildDiceGroups(dice).join('+')
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

export function formatRollLabel(dice: DieType[], rollType?: RollType): string {
  if (rollType === 'advantage') return 'Advantage (d20)'
  if (rollType === 'disadvantage') return 'Disadvantage (d20)'
  return formatDice(dice)
}
