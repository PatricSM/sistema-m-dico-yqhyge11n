/* Host dos toasts (notificações temporárias no rodapé) */
import { Icon } from '../icons'
import type { Toast } from '../types'

interface ToastHostProps {
  toasts: Toast[]
}

export function ToastHost({ toasts }: ToastHostProps) {
  return (
    <div id="toast-wrap">
      {toasts.map(t => (
        <div className="toast" key={t.id}>
          <Icon name={t.icon || 'check'} size={18} className="ic" />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
