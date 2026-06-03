/* Tela — Agendamento (filtros + grade, gravação no Feegow) */
import { useState } from 'react'
import { DATA } from '@/data/clinicaData'
import { Icon } from '../icons'
import { Avatar } from '../ui/Avatar'
import { Pill } from '../ui/Pill'
import { StatusPill } from '../ui/StatusPill'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import type { ToastFn } from '../types'

interface AgendamentoProps {
  onToast: ToastFn
}

interface Selection {
  pro: string
  di: number
  h: string
}

export function ScreenAgendamento({ onToast }: AgendamentoProps) {
  const [tipo, setTipo] = useState('especialidade')
  const [esp, setEsp] = useState('Dermatologia')
  const [uni, setUni] = useState('Centro')
  const [conv, setConv] = useState('Bradesco Saúde')
  const [pro, setPro] = useState('Todos')
  const [sel, setSel] = useState<Selection | null>(null) // {pro, di, h}
  const [taken, setTaken] = useState<Record<string, boolean>>({}) // key -> true
  const [showConfirm, setShowConfirm] = useState(false)
  const [done, setDone] = useState<({ id: number } & Selection) | null>(null) // {id}

  const profs = DATA.profissionais.filter((p) => pro === 'Todos' || p.nome === pro)
  const slotKey = (p: string, di: number, h: string) => `${p}|${di}|${h}`
  const isConvenio = conv !== 'Particular'

  const pickSlot = (p: string, di: number, h: string, off?: boolean) => {
    if (off || taken[slotKey(p, di, h)]) return
    setSel({ pro: p, di, h })
  }

  const confirmar = () => {
    if (!sel) return
    const id = 339000 + Math.floor(Math.random() * 999)
    setTaken((t) => ({ ...t, [slotKey(sel.pro, sel.di, sel.h)]: true }))
    setShowConfirm(false)
    setDone({ id, ...sel })
    onToast(`Agendamento #${id} criado no Feegow · paciente notificado no WhatsApp`, 'check')
  }

  const Select = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string
    value: string
    options: string[]
    onChange: (v: string) => void
  }) => (
    <div className="filter-grp">
      <div className="lbl">{label}</div>
      <label className="select-box">
        <span>{value}</span>
        <Icon name="chevD" size={15} className="chev" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%' }}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    </div>
  )

  const selProf = sel && DATA.profissionais.find((p) => p.nome === sel.pro)
  const selDia = sel && DATA.dias[sel.di]

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="t-display">Agendamento</h1>
          <p className="sub">
            Disponibilidade lida em tempo real do Feegow — sem agenda própria. O agendamento é
            gravado direto via API.
          </p>
        </div>
        <Pill tone="green">
          <span className="dot"></span>Feegow · tempo real
        </Pill>
      </div>

      <div className="ag-grid">
        {/* filtros */}
        <div className="card pad" style={{ position: 'sticky', top: 0 }}>
          <div className="filter-grp">
            <div className="lbl">Paciente</div>
            <div
              className="row gap-2 card flat"
              style={{ padding: 8, border: '1px solid var(--border)', borderRadius: 'var(--r)' }}
            >
              <Avatar iniciais="MA" cor="#7c5cd6" size="sm" />
              <div className="grow">
                <div className="b sm">Marina Alves</div>
                <div className="tiny muted">Feegow #88120</div>
              </div>
            </div>
          </div>
          <div className="filter-grp">
            <div className="lbl">Tipo</div>
            <div className="seg">
              <button
                className={tipo === 'especialidade' ? 'on' : ''}
                onClick={() => setTipo('especialidade')}
              >
                Especialidade
              </button>
              <button
                className={tipo === 'procedimento' ? 'on' : ''}
                onClick={() => setTipo('procedimento')}
              >
                Procedimento
              </button>
            </div>
          </div>
          <Select
            label={tipo === 'especialidade' ? 'Especialidade' : 'Procedimento'}
            value={esp}
            options={DATA.especialidades}
            onChange={setEsp}
          />
          <Select label="Unidade" value={uni} options={DATA.unidades} onChange={setUni} />
          <Select label="Convênio" value={conv} options={DATA.convenios} onChange={setConv} />
          <Select
            label="Profissional"
            value={pro}
            options={['Todos', ...DATA.profissionais.map((p) => p.nome)]}
            onChange={setPro}
          />
          <Select
            label="Período"
            value={'02 – 06 jun'}
            options={['02 – 06 jun', '09 – 13 jun', '16 – 20 jun']}
            onChange={() => {}}
          />
          <Button
            variant="primary"
            block
            icon="refresh"
            onClick={() => onToast('Disponibilidade atualizada do Feegow', 'refresh')}
          >
            Buscar horários
          </Button>
          <div className="legend mt-4">
            <div className="it">
              <span className="sw" style={{ background: 'var(--surface)' }}></span>livre
            </div>
            <div className="it">
              <span
                className="sw"
                style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }}
              ></span>
              selecionado
            </div>
            <div className="it">
              <span
                className="sw"
                style={{ background: 'var(--surface-3)', borderStyle: 'dashed' }}
              ></span>
              ocupado
            </div>
          </div>
        </div>

        {/* grade */}
        <div className="col gap-4">
          <div className="card pad">
            <div className="card-h">
              <div className="t">
                {esp} · {uni}
              </div>
              <Pill tone="blue">
                <Icon name="clock" size={12} />
                atualizado agora
              </Pill>
            </div>
            <div className="sched-wrap">
              <div className="sched">
                <div className="sched-head">
                  <div></div>
                  {DATA.dias.map((d, i) => (
                    <div key={i} className={'day' + (d.today ? ' today' : '')}>
                      <div className="dn">{d.dn}</div>
                      <div className="dd">{d.dd}</div>
                    </div>
                  ))}
                </div>
                {profs.map((p) => (
                  <div className="sched-row" key={p.nome}>
                    <div className="pro">
                      <Avatar iniciais={p.iniciais} cor={p.cor} size="sm" />
                      <div>
                        <div className="b sm truncate">{p.nome}</div>
                        <div className="tiny muted">{p.esp}</div>
                      </div>
                    </div>
                    {DATA.grade[p.nome].map((daySlots, di) => (
                      <div className="sched-cell" key={di}>
                        {daySlots.length === 0 && <div className="sched-empty">—</div>}
                        {daySlots.map((s, j) => {
                          const k = slotKey(p.nome, di, s.h)
                          const isTaken = s.off || taken[k]
                          const isSel = sel && sel.pro === p.nome && sel.di === di && sel.h === s.h
                          return (
                            <div
                              key={j}
                              className={'slot' + (isTaken ? ' off' : '') + (isSel ? ' sel' : '')}
                              onClick={() => pickSlot(p.nome, di, s.h, isTaken)}
                            >
                              {s.h}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {sel && selProf && selDia && (
            <div className="summary-bar">
              <Icon name="calendar" size={22} style={{ color: 'var(--accent)' }} />
              <div className="grow">
                <div className="b">
                  {selProf.nome} · {selDia.dn} {selDia.dd}/06 · {sel.h}
                </div>
                <div className="sm muted">
                  {esp} · {uni} · Marina Alves ·{' '}
                  {isConvenio ? `${conv} (plano=1, valor R$ 0,00)` : 'Particular (R$ 380,00)'}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSel(null)}>
                Cancelar
              </Button>
              <Button variant="primary" icon="check" onClick={() => setShowConfirm(true)}>
                Confirmar agendamento
              </Button>
            </div>
          )}
        </div>
      </div>

      {showConfirm && sel && selProf && selDia && (
        <Modal
          onClose={() => setShowConfirm(false)}
          iconName="calendar"
          iconBg="var(--accent-weak)"
          iconColor="var(--accent)"
        >
          <h2 className="t-h2">Confirmar agendamento?</h2>
          <p className="muted mt-2">
            Será gravado no Feegow via <span className="mono">POST /appoints/new-appoint</span> e
            confirmado ao paciente no WhatsApp.
          </p>
          <div
            className="card flat mt-4"
            style={{ border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 14 }}
          >
            <div className="kv">
              <span className="k">Paciente</span>
              <span className="v">Marina Alves · #88120</span>
            </div>
            <div className="kv">
              <span className="k">{esp}</span>
              <span className="v">{selProf.nome}</span>
            </div>
            <div className="kv">
              <span className="k">Data / hora</span>
              <span className="v" style={{ color: 'var(--accent)' }}>
                {selDia.dn} {selDia.dd}/06 · {sel.h}
              </span>
            </div>
            <div className="kv">
              <span className="k">{isConvenio ? 'Convênio' : 'Particular'}</span>
              <span className="v">{isConvenio ? `${conv} · R$ 0,00` : 'R$ 380,00'}</span>
            </div>
          </div>
          <div className="row gap-2 mt-5" style={{ justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>
              Voltar
            </Button>
            <Button variant="primary" icon="check" onClick={confirmar}>
              Confirmar e gravar
            </Button>
          </div>
        </Modal>
      )}

      {done && (
        <Modal
          onClose={() => {
            setDone(null)
            setSel(null)
          }}
          iconName="check"
          iconBg="var(--success-weak)"
          iconColor="var(--success)"
        >
          <h2 className="t-h2">Agendamento criado ✅</h2>
          <p className="muted mt-2">
            Protocolo{' '}
            <b className="mono" style={{ color: 'var(--fg)' }}>
              #{done.id}
            </b>{' '}
            gravado no Feegow. O contato no CRM foi atualizado para <StatusPill status="agendado" />{' '}
            e o paciente recebeu a confirmação no WhatsApp.
          </p>
          <div className="row gap-2 mt-5" style={{ justifyContent: 'flex-end' }}>
            <Button
              variant="primary"
              onClick={() => {
                setDone(null)
                setSel(null)
              }}
            >
              Concluir
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
