/* Shell — Sidebar de navegação */
import { Icon, type IconName } from '../icons'
import { Avatar } from '../ui/Avatar'
import type { NavigateFn, RouteId } from '../types'

interface NavActiveItem {
  id: RouteId
  ic: IconName
  label: string
  count?: number
}
interface NavSoonItem {
  id: string
  ic: IconName
  label: string
}

export const NAV_ACTIVE: NavActiveItem[] = [
  { id: 'dashboard', ic: 'grid', label: 'Dashboard' },
  { id: 'agente', ic: 'sparkles', label: 'Agente' },
  { id: 'inbox', ic: 'chat', label: 'Inbox — WhatsApp', count: 3 },
  { id: 'contatos', ic: 'users', label: 'Contatos (CRM)' },
  { id: 'agendamento', ic: 'calendar', label: 'Agendamento' },
  { id: 'conexoes', ic: 'plug', label: 'Conexões' },
]
export const NAV_SOON: NavSoonItem[] = [
  { id: 'prontuario', ic: 'stetho', label: 'Prontuário clínico' },
  { id: 'prescricao', ic: 'pillIc', label: 'Prescrição digital' },
  { id: 'tele', ic: 'video', label: 'Teleconsulta' },
  { id: 'lembretes', ic: 'bell', label: 'Lembrete automático' },
  { id: 'faturamento', ic: 'file', label: 'Faturamento TISS' },
  { id: 'financeiro', ic: 'card', label: 'Financeiro' },
  { id: 'estoque', ic: 'box', label: 'Estoque' },
  { id: 'relatorios', ic: 'chart', label: 'Relatórios / BI' },
  { id: 'marketing', ic: 'mega', label: 'Marketing' },
]
export const CRUMB: Record<string, string> = {
  dashboard: 'Dashboard',
  agente: 'Agente de IA',
  inbox: 'Inbox — Atendimento WhatsApp',
  contatos: 'Contatos (CRM)',
  agendamento: 'Agendamento',
  conexoes: 'Conexões',
}

interface SidebarProps {
  route: RouteId
  onNavigate: NavigateFn
  onSoon: (label: string) => void
}

export function Sidebar({ route, onNavigate, onSoon }: SidebarProps) {
  return (
    <aside id="sidebar">
      <div className="brand">
        <div className="mark"><Icon name="hand" size={20} stroke={2.2} /></div>
        <div className="nm">ClinicaFlow<small>CRM conversacional</small></div>
      </div>
      <div className="nav-search">
        <Icon name="search" size={15} />
        <span className="grow">Buscar paciente, conversa…</span>
        <kbd>⌘K</kbd>
      </div>
      <nav className="nav-scroll">
        <div className="nav-sec">Operação</div>
        {NAV_ACTIVE.map(m => (
          <div key={m.id} className={'nav-item' + (route === m.id ? ' active' : '')} onClick={() => onNavigate(m.id)}>
            <span className="ic"><Icon name={m.ic} size={17} /></span>
            <span className="lb">{m.label}</span>
            {m.count ? <span className="count">{m.count}</span> : null}
          </div>
        ))}
        <div className="nav-sec">Em breve</div>
        {NAV_SOON.map(m => (
          <div key={m.id} className="nav-item soon" onClick={() => onSoon(m.label)}>
            <span className="ic"><Icon name={m.ic} size={17} /></span>
            <span className="lb">{m.label}</span>
            <span className="soon-tag">🔜</span>
          </div>
        ))}
      </nav>
      <div className="nav-foot">
        <Avatar iniciais="RM" cor="#3a4150" size="sm" />
        <div className="ft grow">
          <div className="b sm">Recepção · Manhã</div>
          <div className="tiny muted">Unidade Centro</div>
        </div>
        <button className="icon-btn"><Icon name="settings" size={17} /></button>
      </div>
    </aside>
  )
}
