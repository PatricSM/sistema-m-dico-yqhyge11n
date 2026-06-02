/* Tela — Dashboard */
import { Fragment } from 'react'
import { DATA } from '@/data/clinicaData'
import { Icon, type IconName } from '../icons'
import { Avatar } from '../ui/Avatar'
import { Pill } from '../ui/Pill'
import { StatusPill } from '../ui/StatusPill'
import { Button } from '../ui/Button'
import type { NavigateFn } from '../types'

interface DashboardProps {
  onNavigate: NavigateFn
}

export function ScreenDashboard({ onNavigate }: DashboardProps) {
  const recent = DATA.conversations.slice(0, 4)
  const agenda: [string, string, string, string][] = [
    ['08:30', 'Ana Lima', 'Clínico geral', 'ocupado'],
    ['09:15', '—', 'Horário livre', 'livre'],
    ['10:00', 'P. Souza', 'Dermatologia', 'ocupado'],
    ['11:30', 'M. Dias', 'Cardiologia', 'ocupado'],
    ['14:30', 'João Santos', 'Cardiologia', 'novo'],
  ]
  const funil: [string, number, string][] = [['Novo', 28, 'var(--faint)'], ['Em conversa', 19, 'var(--warn)'], ['Qualificado', 14, 'var(--accent)'], ['Agendado', 12, 'var(--success)']]

  const kpi = (lbl: string, n: number | string, color: string, trend: string, trendColor: string, icon: IconName, iconBg: string) => (
    <div className="card kpi">
      <div className="row between">
        <div className="lbl">{lbl}</div>
        <div className="ic-badge" style={{ background: iconBg, color }}><Icon name={icon} size={16} /></div>
      </div>
      <div className="n" style={{ color }}>{n}</div>
      <div className="trend" style={{ color: trendColor }}>{trend}</div>
    </div>
  )

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="t-display">Bom dia, Recepção Centro 👋</h1>
          <p className="sub">Visão do dia — conversas, fila de atendimento e agendamentos gerados via WhatsApp.</p>
        </div>
        <div className="row gap-2">
          <Button icon="trend">Relatório do dia</Button>
          <Button variant="whats" icon="chat" onClick={() => onNavigate('inbox')}>Abrir inbox</Button>
        </div>
      </div>

      <div className="kpi-grid mb-5">
        {kpi('Conversas abertas', 7, 'var(--fg)', '▲ 2 desde ontem', 'var(--success)', 'chat', 'var(--accent-weak)')}
        {kpi('Aguardando atendente', 3, 'var(--warn)', 'tempo médio 4 min', 'var(--muted)', 'clock', 'var(--warn-weak)')}
        {kpi('Agendados hoje', 12, 'var(--accent)', 'via secretária virtual: 9', 'var(--muted)', 'calendar', 'var(--accent-weak)')}
        {kpi('Conversão p/ agendamento', '68%', 'var(--success)', '▲ 5 pts na semana', 'var(--success)', 'trend', 'var(--success-weak)')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 18, alignItems: 'start' }}>
        <div className="col gap-4">
          <div className="card pad">
            <div className="card-h">
              <div className="t">Jornada dos contatos · hoje</div>
              <Pill tone="outline">funil novo → agendado</Pill>
            </div>
            <div className="funnel">
              {funil.map(([l, n, c], i) => (
                <Fragment key={l}>
                  <div className="stage">
                    <div className="n" style={{ color: c }}>{n}</div>
                    <div className="l">{l}</div>
                  </div>
                  {i < funil.length - 1 && <div className="arr"><Icon name="chevR" size={18} /></div>}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="card pad">
            <div className="card-h">
              <div className="t">Conversas recentes</div>
              <a className="sm b" style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => onNavigate('inbox')}>ver todas →</a>
            </div>
            <div>
              {recent.map(c => {
                const ct = DATA.contacts[c.contatoId]
                return (
                  <div className="lrow" key={c.id} onClick={() => onNavigate('inbox')}>
                    <Avatar iniciais={ct.iniciais} cor={ct.cor} size="sm" />
                    <div className="grow">
                      <div className="row between gap-2">
                        <span className="b sm">{ct.nome}</span>
                        <span className="tiny faint">{c.tempo}</span>
                      </div>
                      <div className="muted sm truncate">{c.preview}</div>
                    </div>
                    <StatusPill status={c.estado} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col gap-4">
          <div className="card pad">
            <div className="card-h">
              <div className="t"><Icon name="calendar" size={16} style={{ color: 'var(--accent)' }} />Agenda de hoje</div>
              <Pill tone="green"><span className="dot"></span>Feegow</Pill>
            </div>
            <div>
              {agenda.map(([h, nm, esp, st], i) => (
                <div className="row gap-3" key={i} style={{ padding: '9px 0', borderTop: i ? '1px solid var(--border-2)' : 'none' }}>
                  <div className="mono b" style={{ minWidth: 42, color: 'var(--fg)' }}>{h}</div>
                  <div className="grow">
                    <div className="b sm" style={{ color: st === 'livre' ? 'var(--faint)' : 'var(--fg)' }}>{nm}</div>
                    <div className="tiny muted">{esp}</div>
                  </div>
                  {st === 'livre'
                    ? <Pill tone="outline">vago</Pill>
                    : <span className="dot" style={{ width: 8, height: 8, borderRadius: '50%', background: st === 'novo' ? 'var(--accent)' : 'var(--success)' }}></span>}
                </div>
              ))}
            </div>
          </div>

          <div className="card pad">
            <div className="card-h"><div className="t">Status das integrações</div></div>
            <div className="kv"><span className="k">Feegow API</span><span className="v"><Pill tone="green"><span className="dot"></span>online</Pill></span></div>
            <div className="kv"><span className="k">WhatsApp · Cloud API</span><span className="v"><Pill tone="green"><span className="dot"></span>conectado</Pill></span></div>
            <div className="kv"><span className="k">Rate limit Feegow</span><span className="v">23 / 60 req·min</span></div>
            <div className="kv"><span className="k">Janela 24h (Meta)</span><span className="v muted">4 conv. fora</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
