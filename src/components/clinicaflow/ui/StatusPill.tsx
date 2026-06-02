/* Pill de status que lê o statusMap dos dados */
import { DATA } from '@/data/clinicaData'
import { Pill } from './Pill'

interface StatusPillProps {
  status: string
}

export function StatusPill({ status }: StatusPillProps) {
  const m = DATA.statusMap[status] || { label: status, cls: '' }
  const dot = ['blue', 'green', 'amber', 'red', 'whats'].includes(m.cls)
  return <Pill tone={m.cls}>{dot && <span className="dot"></span>}{m.label}</Pill>
}
