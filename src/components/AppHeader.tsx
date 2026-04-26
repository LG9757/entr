import type { ReactNode } from 'react'
import '../App.css'
import oneGuardLogo from '../assets/oneguard2.png'

type AppHeaderProps = {
  title: string
  subtitle?: string
  backLabel?: string
  onBack?: () => void
  rightSlot?: ReactNode
  className?: string
}

export default function AppHeader({ title, subtitle, backLabel, onBack, rightSlot, className }: AppHeaderProps) {
  const shellClassName = ['app-header-shell', className].filter(Boolean).join(' ')

  return (
    <header className={shellClassName}>
      <div className="app-header-bar">
        <div className="app-header-main">
          {backLabel && onBack && (
            <button className="app-header-back" onClick={onBack}>
              {backLabel}
            </button>
          )}
          <div className="app-header-title-row">
            <img src={oneGuardLogo} alt="One Guard logo" className="app-header-logo" />
            <div className="app-header-copy">
              <div className="app-header-title">{title}</div>
              {subtitle && <div className="app-header-subtitle">{subtitle}</div>}
            </div>
          </div>
        </div>

        {rightSlot && <div className="app-header-right">{rightSlot}</div>}
      </div>
    </header>
  )
}
