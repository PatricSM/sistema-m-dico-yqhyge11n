/* Tela — Contatos (CRM): lista + ficha */
import { Fragment, useState } from 'react'
import { DATA } from '@/data/clinicaData'
import { Icon } from '../icons'
import { Avatar } from '../ui/Avatar'
import { Pill } from '../ui/Pill'
import { StatusPill } from '../ui/StatusPill'
import { Button } from '../ui/Button'
import type { NavigateFn, ToastFn } from '../types'

interface CRMProps {
  onNavigate: NavigateFn
  onToast: ToastFn
}

export function ScreenCRM({ onNavigate }: CRMProps) {
  const ids = Object.keys(DATA.contacts).map(Number)
  const [selId, setSelId] = useState(1042)
  const [filter, setFilter] = useState('todos')
  const ct = DATA.contacts[selId]

  const journeyOrder = ['novo', 'em_conversa', 'qualificado', 'agendado']
  const jIndex = (() => {
    const s = ct.status === 'resolvida' ? 'agendado' : ct.status
    return journeyOrder.indexOf(s)
  })()

  const list = ids.filter(id => {
    const c = DATA.contacts[id]
    if (filter === 'novos') return c.status === 'novo'
    if (filter === 'agendados') return c.status === 'agendado'
    return true
  })

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="t-display">Contatos (CRM)</h1>
          <p className="sub">Todo número que inicia conversa vira um contato — mesmo antes de virar paciente no Feegow.</p>
        </div>
        <div className="row gap-2">
          <Button icon="ext">Importar</Button>
          <Button variant="primary" icon="plus">Novo contato</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 18, alignItems: 'start' }}>
        {/* lista */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: 14 }}>
            <div className="conv-search mb-3" style={{ borderRadius: 'var(--r)' }}><Icon name="search" size={15} /><span>Buscar nome, telefone, CPF…</span></div>
            <div className="row gap-2">
              {[['todos', 'Todos'], ['novos', 'Novos'], ['agendados', 'Agendados']].map(([k, l]) => (
                <span key={k} className={'pill' + (filter === k ? ' blue' : ' outline')} style={{ cursor: 'pointer' }} onClick={() => setFilter(k)}>{l}</span>
              ))}
            </div>
          </div>
          <div className="divider"></div>
          <div>
            {list.map(id => {
              const c = DATA.contacts[id]
              return (
                <div key={id} className="conv" style={{ borderLeftColor: id === selId ? 'var(--accent)' : 'transparent', background: id === selId ? 'var(--accent-weak)' : '' }} onClick={() => setSelId(id)}>
                  <Avatar iniciais={c.iniciais} cor={c.cor} />
                  <div className="meta">
                    <div className="nm"><span className="truncate">{c.nome}</span></div>
                    <div className="tagrow"><StatusPill status={c.status} /></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ficha */}
        <div className="col gap-4">
          <div className="card pad">
            <div className="row between astart wrap gap-3">
              <div className="row gap-3">
                <Avatar iniciais={ct.iniciais} cor={ct.cor} size="lg" />
                <div>
                  <h2 className="t-h2">{ct.nome}</h2>
                  <div className="muted sm mt-1">contato #{ct.id} · origem <b style={{ color: 'var(--fg)' }}>{ct.origem}</b> · criado {ct.criado}</div>
                  <div className="row gap-2 wrap mt-2">
                    <Pill tone="outline"><Icon name="phone" size={12} />{ct.fone}</Pill>
                    {ct.email !== '—' && <Pill tone="outline"><Icon name="mail" size={12} />{ct.email}</Pill>}
                    {ct.pacienteFeegow && <Pill tone="blue">paciente Feegow #{ct.pacienteFeegow}</Pill>}
                  </div>
                </div>
              </div>
              <div className="row gap-2">
                <Button variant="whats" size="sm" icon="chat" onClick={() => onNavigate('inbox')}>Conversa</Button>
                <Button variant="primary" size="sm" icon="calendar" onClick={() => onNavigate('agendamento')}>Agendar</Button>
              </div>
            </div>

            <div className="upper" style={{ margin: '20px 0 12px' }}>Status da jornada</div>
            <div className="journey">
              {[['Novo'], ['Em conversa'], ['Qualificado'], ['Agendado']].map(([lb], i) => {
                const cls = i < jIndex ? 'done' : i === jIndex ? 'now' : 'todo'
                return (
                  <Fragment key={lb}>
                    <div className={'st ' + cls}>
                      <div className="mk">{i < jIndex ? <Icon name="check" size={13} /> : i + 1}</div>
                      <div className="lb">{lb}</div>
                    </div>
                    <div className={'seg' + (i < jIndex ? ' done' : '')}></div>
                  </Fragment>
                )
              })}
              <div className="st todo">
                <div className="mk">5</div>
                <div className="lb">Atendido <span className="pill soon" style={{ marginLeft: 4 }}>🔜</span></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
            <div className="card pad">
              <div className="card-h"><div className="t">Linha do tempo</div></div>
              <div className="tl">
                <div className="tl-item green"><div className="tt">Lead criado</div><div className="dd">primeira mensagem no WhatsApp</div><time>{ct.criado}</time></div>
                <div className="tl-item"><div className="tt">Intenção detectada</div><div className="dd">classificada pela secretária virtual</div></div>
                {ct.pacienteFeegow && <div className="tl-item green"><div className="tt">Vinculado ao paciente Feegow</div><div className="dd mono">GET /patient/search → #{ct.pacienteFeegow}</div></div>}
                {ct.status === 'agendado' && <div className="tl-item green"><div className="tt">Agendamento criado</div><div className="dd mono">POST /appoints/new-appoint → #{ct.agendamento}</div></div>}
                {ct.status !== 'agendado' && ct.status !== 'novo' && <div className="tl-item amber"><div className="tt">Horários ofertados</div><div className="dd">aguardando escolha do paciente</div></div>}
              </div>
            </div>

            <div className="col gap-4">
              <div className="card pad">
                <div className="card-h"><div className="t">Dados &amp; convênio</div></div>
                <div className="kv"><span className="k">Nascimento</span><span className="v">{ct.nascimento}</span></div>
                <div className="kv"><span className="k">CPF</span><span className="v">{ct.cpf}</span></div>
                <div className="kv"><span className="k">Convênio</span><span className="v">{ct.convenio}</span></div>
                <div className="kv"><span className="k">Plano</span><span className="v">{ct.plano}</span></div>
                <div className="kv"><span className="k">Unidade pref.</span><span className="v">{ct.unidade}</span></div>
              </div>
              <div className="card pad">
                <div className="card-h"><div className="t">Conversas vinculadas</div></div>
                <div className="lrow" onClick={() => onNavigate('inbox')}>
                  <div className="av sm" style={{ background: 'var(--whats)' }}><Icon name="chat" size={13} /></div>
                  <div className="grow"><div className="b sm">Atendimento WhatsApp</div><div className="tiny muted">{DATA.statusMap[ct.status].label}</div></div>
                  <Icon name="chevR" size={16} style={{ color: 'var(--faint)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
