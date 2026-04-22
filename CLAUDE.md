# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # type-check (tsc -b) then bundle (vite build)
npm run preview   # serve the production build locally
```

Prettier is configured for code formatting. Run `npm run format` to format all files in-place, or `npm run format:check` to verify (exits non-zero if anything needs formatting).

## Architecture

Single-page React + TypeScript app built with Vite. No routing. All state lives in `App.tsx` and flows down as props.

### State

`App.tsx` owns all state:

- `selectedDice: DieType[]` — sides of dice queued for the next roll, kept sorted descending
- `currentRoll: RollEntry | null` — most recent roll result, drives the `RollResult` panel
- `useRollHistory` hook — history array + `addRoll` / `clearHistory`, persisted to `localStorage`
- `useTheme` hook — light/dark/system preference, persisted to `localStorage`, applies `.dark` class to `<html>`

### Data flow for a roll

1. User clicks a die button → `addDie(sides)` sorts `selectedDice` descending
2. User clicks Roll → `rollDice(selectedDice)` generates results, builds a `RollEntry`, updates both `currentRoll` and history
3. The same `rollDice` function is passed to `RollHistory` as `onReroll` so history entries can be re-rolled

### Key files

| File                          | Purpose                                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `src/types.ts`                | `DICE_TYPES` constant, `DieType`, `RollEntry` interface                                                   |
| `src/diceColors.ts`           | Tailwind class strings per die type — keyed by `DieType`                                                  |
| `src/utils.ts`                | `formatDice` (spaced, e.g. `1d20 + 2d6`), `formatDiceExpression` (compact, e.g. `1d20+2d6`), `formatTime` |
| `src/hooks/useRollHistory.ts` | localStorage persistence, 100-entry cap                                                                   |
| `src/hooks/useTheme.ts`       | Theme switching + `theme-color` meta tag sync + system preference listener                                |

### Theme system

- Tailwind v4 with `@custom-variant dark` (class-based, not media query)
- An inline script in `index.html` applies `.dark` before first paint to prevent flash
- `useTheme` keeps the `<meta name="theme-color">` in sync for iOS Safari chrome colour
- `src/index.css` sets `background-color` on `html` so iOS overscroll areas match the theme

### Accessibility conventions

- Landmark elements: `<main>`, `<header>`, `<footer>`, `<section>` with `aria-labelledby`
- Dynamic roll results announced via a persistent `sr-only` `role="status" aria-live="polite"` div in `App.tsx`
- All icon-only buttons carry `aria-label`; decorative icons are `aria-hidden`
- `*:focus-visible` outline defined in `index.css`

### Adding a new die type

1. Add the value to `DICE_TYPES` in `src/types.ts`
2. Add a matching color entry in `src/diceColors.ts` (TypeScript will error if missing)
