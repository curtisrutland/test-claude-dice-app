function buildDiceGroups(dice: number[]): string[] {
  const counts: Record<number, number> = {}
  for (const d of dice) {
    counts[d] = (counts[d] ?? 0) + 1
  }
  return Object.entries(counts)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([sides, count]) => `${count}d${sides}`)
}

export function formatDice(dice: number[]): string {
  return buildDiceGroups(dice).join(' + ')
}

export function formatDiceExpression(dice: number[]): string {
  return buildDiceGroups(dice).join('+')
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}
