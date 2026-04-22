export const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100] as const
export type DieType = (typeof DICE_TYPES)[number]

export interface RollEntry {
  id: string
  timestamp: number
  dice: number[]
  results: number[]
  total: number
}
