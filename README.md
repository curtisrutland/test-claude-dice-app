# Dice Roller

A simple, accessible dice roller for tabletop RPGs such as D&D. Select any combination of standard dice, roll them, and track your history — all in the browser.

**Live site:** https://curtisrutland.github.io/test-claude-dice-app/

## Features

- Roll any combination of **d4, d6, d8, d10, d12, d20, d100**
- See individual results per die and the total
- **Roll history** persisted to `localStorage` (last 100 rolls)
- **Reroll** any previous roll directly from the history
- **Light / Dark / System** theme with no flash on load
- Fully accessible — keyboard navigable, screen reader friendly, WCAG AA contrast

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS v4](https://tailwindcss.com/) (styling)
- [Lucide React](https://lucide.dev/) (icons)
- Deployed via [GitHub Pages](https://pages.github.com/) using GitHub Actions

## Local development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Build

```bash
npm run build   # type-check + bundle
npm run preview # preview the production build locally
```

Deployment to GitHub Pages happens automatically on every push to `main`.

## Credits

- Favicon: [dice-d20](https://fontawesome.com/icons/dice-d20) by [Font Awesome](https://fontawesome.com), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
