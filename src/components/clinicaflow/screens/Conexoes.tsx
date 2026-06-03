/* Tela — Conexões (integrações + destino do agendamento) */
import { Fragment, useState, type ReactNode } from 'react'
import { Icon, type IconName } from '../icons'
import { Pill } from '../ui/Pill'
import { Button } from '../ui/Button'
import type { ToastFn } from '../types'

interface ConexoesProps {
  onToast: ToastFn
}

export function ScreenConexoes({ onToast }: ConexoesProps) {
  const [conn, setConn] = useState<Record<string, boolean>>({
    waOficial: true,
    waNaoOficial: false,
    feegow: true,
    gcal: false,
    outlook: false,
    openai: true,
    anthropic: false,
  })
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [destino, setDestino] = useState('feegow')
  const [provider, setProvider] = useState('cloud')
  const [oaModel, setOaModel] = useState('gpt-4o')
  const [antModel, setAntModel] = useState('claude-sonnet-4.5')

  const setC = (k: string, v: boolean) =>
    setConn((c) => {
      const next = { ...c, [k]: v }
      if (!v && destino === k) {
        const fall = ['feegow', 'gcal', 'outlook'].find((d) => d !== k && next[d])
        setDestino(fall || 'feegow')
      }
      return next
    })
  const toggleOpen = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }))
  const connect = (k: string, label: string) => {
    setC(k, true)
    setOpen((o) => ({ ...o, [k]: true }))
    onToast(`${label} conectado`, 'check')
  }
  const disconnect = (k: string, label: string) => {
    setC(k, false)
    onToast(`${label} desconectado`, 'x')
  }

  const ConnCard = ({
    tile,
    icon,
    iconColor = '#fff',
    nome,
    desc,
    k,
    statusOn = 'conectado',
    connectLabel,
    children,
  }: {
    tile: string
    icon: IconName
    iconColor?: string
    nome: string
    desc: string
    k: string
    statusOn?: string
    statusOff?: string
    connectLabel?: string
    children?: ReactNode
  }) => {
    const on = conn[k]
    const isOpen = !!open[k]
    return (
      <div className="card pad">
        <div className="conn-head">
          <div className="brand-tile" style={{ background: tile }}>
            <Icon name={icon} size={21} style={{ color: iconColor }} />
          </div>
          <div className="grow">
            <div className="row gap-2">
              <span className="bb truncate">{nome}</span>
              {on && (
                <Pill tone="green">
                  <span className="dot"></span>
                  {statusOn}
                </Pill>
              )}
            </div>
            <div className="muted sm truncate">{desc}</div>
          </div>
          {on ? (
            <button
              className={'icon-btn chev-btn' + (isOpen ? ' open' : '')}
              onClick={() => toggleOpen(k)}
              aria-label="expandir"
            >
              <Icon name="chevD" size={18} />
            </button>
          ) : (
            <Button size="sm" variant="primary" icon="plug" onClick={() => connect(k, nome)}>
              {connectLabel || 'Conectar'}
            </Button>
          )}
        </div>
        {on && isOpen && (
          <div className="conn-body">
            {children}
            <div className="mt-4">
              <Button size="sm" variant="ghost" icon="x" onClick={() => disconnect(k, nome)}>
                Desconectar
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const ModelSelect = ({
    value,
    options,
    onChange,
  }: {
    value: string
    options: string[]
    onChange: (v: string) => void
  }) => (
    <label className="select-box">
      <span>{value}</span>
      <Icon name="chevD" size={15} className="chev" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%' }}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )

  const Usage = ({ on, tokens, custo }: { on: boolean; tokens: string; custo: string }) =>
    on ? (
      <div className="row between mt-3" style={{ alignItems: 'flex-end' }}>
        <div>
          <div className="tiny muted">Uso este mês</div>
          <div className="b">{tokens}</div>
        </div>
        <div className="row gap-2">
          <Pill tone="outline">~R$ {custo}</Pill>
          <Pill tone="green">
            <span className="dot"></span>no limite
          </Pill>
        </div>
      </div>
    ) : (
      <div className="tiny faint mt-3">Conecte para ver o uso de tokens.</div>
    )

  const dests: { k: string; nome: string; desc: string; icon: IconName; color: string }[] = [
    {
      k: 'feegow',
      nome: 'Feegow',
      desc: 'agenda + prontuário',
      icon: 'plug',
      color: 'var(--accent)',
    },
    {
      k: 'gcal',
      nome: 'Google Calendar',
      desc: 'eventos no calendário',
      icon: 'calendar',
      color: '#1a73e8',
    },
    { k: 'outlook', nome: 'Outlook', desc: 'Microsoft 365', icon: 'calendar', color: '#0a66c2' },
  ]

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="t-display">Conexões</h1>
          <p className="sub">
            Conecte os serviços que o agente usa para atender no WhatsApp, pensar (IA) e agendar.
          </p>
        </div>
        <Button icon="refresh" onClick={() => onToast('Conexões revalidadas', 'check')}>
          Revalidar tudo
        </Button>
      </div>

      {/* destino do agendamento */}
      <div className="card pad mb-5">
        <div className="card-h">
          <div className="t">
            <Icon name="calendar" size={16} style={{ color: 'var(--accent)' }} />
            Destino do agendamento
          </div>
          <Pill tone="blue">onde o agente cria os agendamentos</Pill>
        </div>
        <div className="dest-grid">
          {dests.map((d) => {
            const enabled = conn[d.k]
            const sel = destino === d.k
            return (
              <div
                key={d.k}
                className={'dest-card' + (sel ? ' sel' : '') + (!enabled ? ' disabled' : '')}
                onClick={() => enabled && setDestino(d.k)}
              >
                <span className="radio"></span>
                <div className="row gap-3">
                  <div
                    className="brand-tile"
                    style={{ background: d.color, width: 38, height: 38 }}
                  >
                    <Icon name={d.icon} size={18} style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <div className="bb">{d.nome}</div>
                    <div className="tiny muted">{d.desc}</div>
                  </div>
                </div>
                <div className="mt-3">
                  {enabled ? (
                    <span className="tiny" style={{ color: 'var(--success)' }}>
                      {sel ? '✓ destino ativo' : 'disponível'}
                    </span>
                  ) : (
                    <span className="tiny faint">conecte abaixo para usar</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="note-box info mt-3">
          <Icon name="sparkles" size={16} style={{ flexShrink: 0 }} />A disponibilidade de horários
          e a gravação do agendamento usam o destino escolhido. Os demais ficam apenas como
          espelho/observação.
        </div>
      </div>

      {/* WhatsApp */}
      <div className="upper mb-3">Canais de atendimento · WhatsApp</div>
      <div className="conn-grid mb-5">
        <ConnCard
          tile="var(--whats)"
          icon="chat"
          nome="WhatsApp Oficial"
          k="waOficial"
          desc="API oficial via número verificado (selo Meta)."
          statusOn="conectado"
        >
          <div className="field mb-3">
            <label>Provedor (BSP)</label>
            <div className="seg">
              {[
                ['cloud', 'Cloud API'],
                ['twilio', 'Twilio'],
                ['zenvia', 'Zenvia'],
              ].map(([v, l]) => (
                <button
                  key={v}
                  className={provider === v ? 'on' : ''}
                  onClick={() => setProvider(v)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="kv">
            <span className="k">Número</span>
            <span className="v">+55 11 4002-8922 ✓</span>
          </div>
          <div className="kv">
            <span className="k">Selo Meta</span>
            <span className="v">verificado</span>
          </div>
          <div className="kv">
            <span className="k">Janela 24h</span>
            <span className="v">templates HSM aprovados</span>
          </div>
        </ConnCard>

        <ConnCard
          tile="#0e7a63"
          icon="chat"
          nome="WhatsApp não oficial"
          k="waNaoOficial"
          desc="Conexão direta via QR Code (sem API oficial)."
          statusOff="desconectado"
          connectLabel="Conectar"
        >
          <div className="note-box">
            <Icon name="lock" size={16} style={{ flexShrink: 0 }} />
            <div>
              <b>Atenção:</b> não homologado pela Meta. Sujeito a bloqueio do número e sem garantia
              de entrega. Use apenas para testes ou volumes baixos.
            </div>
          </div>
        </ConnCard>
      </div>

      {/* IA */}
      <div className="upper mb-3">Inteligência artificial · modelo do agente</div>
      <div className="conn-grid mb-5">
        <ConnCard
          tile="#10a37f"
          icon="sparkles"
          nome="OpenAI API"
          k="openai"
          desc="Modelo GPT para interpretar e responder conversas."
          statusOn="ativo"
          connectLabel="Adicionar key"
        >
          <div className="field mb-3">
            <label>API key</label>
            <div className="input">
              <span className="mono grow">
                {conn.openai ? 'sk-•••••••••••••••••••••a91c' : 'sk-...'}
              </span>
              <Icon name="lock" size={14} style={{ color: 'var(--faint)' }} />
            </div>
          </div>
          <div className="field">
            <label>Modelo</label>
            <ModelSelect
              value={oaModel}
              options={['gpt-4o', 'gpt-4o-mini', 'gpt-4.1', 'gpt-4.1-mini']}
              onChange={setOaModel}
            />
          </div>
          <Usage on={conn.openai} tokens="1,24 M tokens" custo="142,00" />
        </ConnCard>

        <ConnCard
          tile="#d97757"
          icon="sparkles"
          nome="Anthropic API"
          k="anthropic"
          desc="Modelo Claude para interpretar e responder conversas."
          statusOn="ativo"
          connectLabel="Adicionar key"
        >
          <div className="field mb-3">
            <label>API key</label>
            <div className="input">
              <span className="mono grow">
                {conn.anthropic ? 'sk-ant-•••••••••••••••e7d2' : 'sk-ant-...'}
              </span>
              <Icon name="lock" size={14} style={{ color: 'var(--faint)' }} />
            </div>
          </div>
          <div className="field">
            <label>Modelo</label>
            <ModelSelect
              value={antModel}
              options={['claude-sonnet-4.5', 'claude-opus-4.1', 'claude-haiku-4.5']}
              onChange={setAntModel}
            />
          </div>
          <Usage on={conn.anthropic} tokens="0,86 M tokens" custo="98,00" />
        </ConnCard>
      </div>

      {/* Agendas */}
      <div className="upper mb-3">Agendas &amp; destinos de agendamento</div>
      <div className="conn-grid">
        <ConnCard
          tile="var(--accent)"
          icon="plug"
          nome="Feegow"
          k="feegow"
          desc="Fonte de verdade da agenda — disponibilidade e gravação."
          statusOn="token válido"
        >
          <div className="field mb-3">
            <label>x-access-token</label>
            <div className="input">
              <span className="mono grow">••••••••3f9a</span>
              <Icon name="lock" size={14} style={{ color: 'var(--faint)' }} />
            </div>
          </div>
          <div className="kv">
            <span className="k">Licença</span>
            <span className="v">Clínica Centro Ltda</span>
          </div>
          <div className="kv">
            <span className="k">Validação</span>
            <span className="v mono">GET /specialties/list ✓</span>
          </div>
          <div className="row gap-2 mt-3">
            <Button
              size="sm"
              icon="refresh"
              onClick={() => onToast('Token Feegow validado', 'check')}
            >
              Validar token
            </Button>
          </div>
        </ConnCard>

        <ConnCard
          tile="#1a73e8"
          icon="calendar"
          nome="Google Calendar"
          k="gcal"
          desc="Cria eventos diretamente em um calendário do Google."
          connectLabel="Conectar"
        >
          {conn.gcal && (
            <Fragment>
              <div className="kv">
                <span className="k">Conta</span>
                <span className="v">clinica@gmail.com</span>
              </div>
              <div className="field mt-3">
                <label>Calendário</label>
                <label className="select-box">
                  <span>Agenda — Clínica Centro</span>
                  <Icon name="chevD" size={15} className="chev" />
                </label>
              </div>
            </Fragment>
          )}
        </ConnCard>

        <ConnCard
          tile="#0a66c2"
          icon="calendar"
          nome="Outlook"
          k="outlook"
          desc="Cria eventos em um calendário do Microsoft 365."
          connectLabel="Conectar"
        >
          {conn.outlook && (
            <Fragment>
              <div className="kv">
                <span className="k">Conta</span>
                <span className="v">recepcao@clinica.com</span>
              </div>
              <div className="field mt-3">
                <label>Calendário</label>
                <label className="select-box">
                  <span>Calendário — Recepção</span>
                  <Icon name="chevD" size={15} className="chev" />
                </label>
              </div>
            </Fragment>
          )}
        </ConnCard>
      </div>
    </div>
  )
}
