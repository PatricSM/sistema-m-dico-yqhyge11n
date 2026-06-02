/* Pill / badge */
import type { CSSProperties, ReactNode } from 'react'

interface PillProps {
  children: ReactNode
  tone?: string
  className?: string
  style?: CSSProperties
}

export function Pill({ children, tone, className, style }: PillProps) {
  return <span className={'pill' + (tone ? ' ' + tone : '') + (className ? ' ' + className : '')} style={style}>{children}</span>
}
