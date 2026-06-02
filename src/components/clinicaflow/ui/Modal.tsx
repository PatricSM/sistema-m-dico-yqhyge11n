/* Modal com scrim e ícone opcional */
import type { ReactNode } from 'react'
import { Icon, type IconName } from '../icons'

interface ModalProps {
  children: ReactNode
  onClose: () => void
  iconName?: IconName
  iconBg?: string
  iconColor?: string
}

export function Modal({ children, onClose, iconName, iconBg, iconColor }: ModalProps) {
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {iconName &&
          <div className="m-ic" style={{ background: iconBg, color: iconColor }}>
            <Icon name={iconName} size={26} />
          </div>}
        {children}
      </div>
    </div>
  )
}
