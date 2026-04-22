import type { Theme } from '../hooks/useTheme'

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

interface Props {
  theme: Theme
  onChange: (theme: Theme) => void
}

export default function ThemeToggle({ theme, onChange }: Props) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 text-sm transition-colors ${
            theme === opt.value
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
