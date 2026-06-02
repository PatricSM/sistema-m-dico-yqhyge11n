/* Shell — Topbar com breadcrumb e controles */
import { Icon } from '../icons'
import { Avatar } from '../ui/Avatar'
import { CRUMB } from './Sidebar'
import type { RouteId } from '../types'

interface TopbarProps {
  route: RouteId
}

export function Topbar({ route }: TopbarProps) {
  return (
    <header id="topbar">
      <div className="crumb">ClinicaFlow&nbsp;&nbsp;›&nbsp;&nbsp;<b>{CRUMB[route] || ''}</b></div>
      <div className="row gap-2" style={{ marginLeft: 'auto' }}>
        <div className="topctl"><span className="dot" style={{ background: 'var(--whats)' }}></span>WhatsApp: Cloud API (Meta)</div>
        <div className="topctl"><Icon name="building" size={14} />Unidade Centro<Icon name="chevD" size={13} style={{ color: 'var(--faint)' }} /></div>
        <Avatar iniciais="DR" cor="var(--accent)" size="sm" />
      </div>
    </header>
  )
}
