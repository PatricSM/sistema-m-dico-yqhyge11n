/* Botão do design system (variantes primary/whats/secondary/ghost · sm/xs · block) */
import type { CSSProperties, ReactNode } from 'react'
import { Icon, type IconName } from '../icons'

interface ButtonProps {
  variant?: 'primary' | 'whats' | 'secondary' | 'ghost'
  size?: 'sm' | 'xs'
  block?: boolean
  icon?: IconName
  iconRight?: IconName
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
}

export function Button({
  variant = 'secondary',
  size,
  block,
  icon,
  iconRight,
  children,
  onClick,
  disabled,
  style,
}: ButtonProps) {
  const cls = ['btn', variant, size, block ? 'block' : ''].filter(Boolean).join(' ')
  return (
    <button className={cls} onClick={onClick} disabled={disabled} style={style}>
      {icon && <Icon name={icon} size={size === 'xs' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'xs' ? 14 : 16} />}
    </button>
  )
}
