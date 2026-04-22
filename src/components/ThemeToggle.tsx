import { Sun, Moon, Monitor } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

const OPTIONS: { value: Theme; label: string; Icon: React.ElementType }[] = [
  { value: 'light', label: 'Light theme', Icon: Sun },
  { value: 'dark', label: 'Dark theme', Icon: Moon },
  { value: 'system', label: 'System theme', Icon: Monitor },
]

interface Props {
  theme: Theme
  onChange: (theme: Theme) => void
}

export default function ThemeToggle({ theme, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Theme selection"
      className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-label={label}
          aria-pressed={theme === value}
          title={label}
          className={`px-3 py-1.5 transition-colors ${
            theme === value
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          <Icon size={16} aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
