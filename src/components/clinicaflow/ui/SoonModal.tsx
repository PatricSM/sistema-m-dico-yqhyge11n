/* Modal "Em breve" para módulos ainda não disponíveis */
import { Modal } from './Modal'
import { Pill } from './Pill'
import { Button } from './Button'

interface SoonModalProps {
  titulo: string
  onClose: () => void
}

export function SoonModal({ titulo, onClose }: SoonModalProps) {
  return (
    <Modal onClose={onClose} iconName="clock" iconBg="var(--surface-3)" iconColor="var(--muted)">
      <Pill tone="soon">🔜 Em breve</Pill>
      <h2 className="t-h2" style={{ marginTop: 12 }}>{titulo}</h2>
      <p className="muted" style={{ marginTop: 8 }}>
        Este módulo já faz parte da visão do produto, mas ainda não está disponível nesta fase.
        O foco atual é o fluxo <b style={{ color: 'var(--fg)' }}>WhatsApp → Agendamento</b> integrado ao Feegow.
      </p>
      <div className="row gap-2" style={{ marginTop: 20, justifyContent: 'flex-end' }}>
        <Button variant="primary" onClick={onClose}>Entendi</Button>
      </div>
    </Modal>
  )
}
