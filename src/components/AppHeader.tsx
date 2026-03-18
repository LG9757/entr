import type { ReactNode } from 'react'
import '../App.css'

type AppHeaderProps = {
  title: string
  subtitle?: string
  backLabel?: string
  onBack?: () => void
  rightSlot?: ReactNode
}

export default function AppHeader({ title, subtitle, backLabel, onBack, rightSlot }: AppHeaderProps) {
  return (
    <header className="app-header-shell">
      <div className="app-header-bar">
        <div className="app-header-main">
          {backLabel && onBack && (
            <button className="app-header-back" onClick={onBack}>
              {backLabel}
            </button>
          )}
          <div className="app-header-copy">
            <div className="app-header-title">{title}</div>
            {subtitle && <div className="app-header-subtitle">{subtitle}</div>}
          </div>
        </div>

        {rightSlot && <div className="app-header-right">{rightSlot}</div>}
      </div>
    </header>
  )
}
