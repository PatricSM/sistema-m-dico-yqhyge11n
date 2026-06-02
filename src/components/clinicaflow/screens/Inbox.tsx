/* Tela — Inbox (3 colunas, interativo) */
import { Fragment, useEffect, useRef, useState } from 'react'
import { DATA, type Conversation } from '@/data/clinicaData'
import { Icon } from '../icons'
import { Avatar } from '../ui/Avatar'
import { Pill } from '../ui/Pill'
import { StatusPill } from '../ui/StatusPill'
import { Button } from '../ui/Button'
import type { ToastFn } from '../types'

interface InboxProps {
  onToast: ToastFn
}

export function ScreenInbox({ onToast }: InboxProps) {
  const [convs, setConvs] = useState<Conversation[]>(() => JSON.parse(JSON.stringify(DATA.conversations)))
  const [selId, setSelId] = useState(1)
  const [filter, setFilter] = useState('todas')
  const [ctxTab, setCtxTab] = useState('contato')
  const [draft, setDraft] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  const sel = convs.find(c => c.id === selId)!
  const ct = DATA.contacts[sel.contatoId]

  const filtered = convs.filter(c =>
    filter === 'todas' ? true :
    filter === 'atendente' ? c.controlador === 'humano' :
    c.controlador === 'ia')

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [selId, sel.mensagens.length])

  const send = (txt?: string) => {
    const t = (txt ?? draft).trim()
    if (!t) return
    setConvs(cs => cs.map(c => c.id === selId
      ? { ...c, mensagens: [...c.mensagens, { de: 'out', txt: t, t: 'agora' }], preview: t, controlador: 'humano', estado: c.estado === 'aguardando_atendente' ? 'em_conversa' : c.estado }
      : c))
    setDraft('')
  }

  const assumir = () => {
    setConvs(cs => cs.map(c => c.id === selId ? { ...c, controlador: 'humano', estado: 'em_conversa' } : c))
    onToast('Você assumiu a conversa — automação pausada', 'hand')
  }

  // AI pipeline state
  const stepState = (i: number) => {
    const n = i + 1
    if (sel.estado === 'agendado' || sel.estado === 'resolvida') return 'done'
    if (n < sel.etapaIA) return 'done'
    if (n === sel.etapaIA) return 'now'
    return ''
  }

  const sugestao = ({
    1: { tipo: 'humano', txt: 'Paciente novo sem dados. Inicie pedindo nome e qual exame deseja.', btn: 'Responder' },
    4: { tipo: 'acao', txt: 'Confirmar Qui 05/06 · 11:00 com Dra. Helena (remarcação)', btn: 'Confirmar p/ paciente' },
    5: { tipo: 'acao', txt: 'Aguardando o paciente escolher um dos 3 horários ofertados.', btn: 'Ofertar novamente' },
    7: { tipo: 'ok', txt: 'Agendamento concluído e confirmado ao paciente.', btn: null as string | null },
  } as Record<number, { tipo: string; txt: string; btn: string | null }>)[sel.etapaIA] || { tipo: 'humano', txt: 'Acompanhe a conversa.', btn: 'Responder' }

  return (
    <div className="inbox">
      {/* ---- Lista ---- */}
      <div className="pane">
        <div className="pane-h">
          <div className="row between mb-3">
            <h2 className="t-h2">Conversas</h2>
            <button className="icon-btn"><Icon name="plus" size={18} /></button>
          </div>
          <div className="conv-search"><Icon name="search" size={15} /><span>Buscar conversa…</span></div>
        </div>
        <div className="conv-filters">
          {[['todas', 'Todas · 5'], ['atendente', 'Atendente · 2'], ['ia', 'IA · 3']].map(([k, l]) => (
            <span key={k} className={'f' + (filter === k ? ' on' : '')} onClick={() => setFilter(k)}>{l}</span>
          ))}
        </div>
        <div className="pane-scroll">
          {filtered.map(c => {
            const cc = DATA.contacts[c.contatoId]
            return (
              <div key={c.id} className={'conv' + (c.id === selId ? ' active' : '')} onClick={() => setSelId(c.id)}>
                <Avatar iniciais={cc.iniciais} cor={cc.cor} />
                <div className="meta">
                  <div className="nm"><span className="truncate">{cc.nome}</span><time>{c.tempo}</time></div>
                  <div className="pv truncate">{c.preview}</div>
                  <div className="tagrow">
                    <StatusPill status={c.estado} />
                    {c.controlador === 'ia'
                      ? <Pill tone="blue"><Icon name="sparkles" size={11} />IA</Pill>
                      : <Pill tone="outline">humano</Pill>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ---- Thread ---- */}
      <div className="pane">
        <div className="thread-h">
          <Avatar iniciais={ct.iniciais} cor={ct.cor} />
          <div className="grow">
            <div className="bb">{ct.nome}</div>
            <div className="tiny muted">{ct.fone} · contato #{ct.id}{ct.pacienteFeegow ? ` · paciente Feegow #${ct.pacienteFeegow}` : ' · sem cadastro Feegow'}</div>
          </div>
          <StatusPill status={sel.estado} />
          <Button size="sm" icon="hand" onClick={assumir} disabled={sel.controlador === 'humano'}>
            {sel.controlador === 'humano' ? 'Assumida' : 'Assumir'}
          </Button>
        </div>

        <div className="thread-body" ref={bodyRef}>
          <div className="day-sep">Hoje</div>
          {sel.mensagens.map((m, i) => (
            <div key={i} className={'msg ' + m.de}>
              {m.de === 'bot' && <div className="bot-tag"><Icon name="sparkles" size={12} />secretária virtual</div>}
              <div>{m.txt}</div>
              {m.opts && (
                <div className="opts">
                  {m.opts.map((o, j) => <div className="opt" key={j} onClick={() => send(o)}>{o}</div>)}
                </div>
              )}
              <time>{m.t}</time>
            </div>
          ))}
        </div>

        <div className="thread-input">
          <div className="window-note"><Icon name="clock" size={13} style={{ color: 'var(--success)' }} />Janela de atendimento de 24h aberta · mensagem livre permitida</div>
          <div className="composer">
            <button className="icon-btn"><Icon name="smile" size={19} /></button>
            <textarea className="box" rows={1} placeholder="Escreva uma mensagem…" value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} />
            <Button variant="whats" icon="send" onClick={() => send()}>Enviar</Button>
          </div>
        </div>
      </div>

      {/* ---- Contexto + IA ---- */}
      <div className="pane">
        <div className="ctx-tabs">
          <div className={'ctx-tab' + (ctxTab === 'contato' ? ' on' : '')} onClick={() => setCtxTab('contato')}>Contato</div>
          <div className={'ctx-tab' + (ctxTab === 'ia' ? ' on' : '')} onClick={() => setCtxTab('ia')}>Secretária virtual</div>
        </div>
        <div className="pane-scroll" style={{ padding: 16 }}>
          {ctxTab === 'contato' ? (
            <Fragment>
              <div className="row gap-3 mb-3">
                <Avatar iniciais={ct.iniciais} cor={ct.cor} size="lg" />
                <div><div className="bb lg">{ct.nome}</div><div className="tiny muted">{DATA.statusMap[ct.status].label} · origem {ct.origem}</div></div>
              </div>
              <div className="kv"><span className="k">WhatsApp</span><span className="v">{ct.fone}</span></div>
              <div className="kv"><span className="k">Paciente Feegow</span><span className="v">{ct.pacienteFeegow ? '#' + ct.pacienteFeegow : '—'}</span></div>
              <div className="kv"><span className="k">Convênio</span><span className="v">{ct.convenio}</span></div>
              <div className="kv"><span className="k">Unidade</span><span className="v">{ct.unidade}</span></div>
              <div className="upper" style={{ margin: '18px 0 10px' }}>Linha do tempo</div>
              <div className="tl">
                <div className="tl-item green"><div className="tt">Lead criado</div><div className="dd">primeira mensagem no WhatsApp</div><time>{ct.criado}</time></div>
                <div className="tl-item"><div className="tt">Intenção: {sel.intencao}</div><div className="dd">detectada pela IA</div></div>
                {sel.etapaIA >= 5 && <div className="tl-item amber"><div className="tt">Horários ofertados</div><div className="dd">via /appoints/available-schedule</div></div>}
                {sel.estado === 'agendado' && <div className="tl-item green"><div className="tt">Agendamento criado</div><div className="dd mono">#{ct.agendamento}</div></div>}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="ai-card mb-4">
                <div className="row between mb-2">
                  <span className="ai-live"><span className="ai-dot"></span>AO VIVO</span>
                  <Pill tone="blue">etapa {Math.min(sel.etapaIA, 7)}/7</Pill>
                </div>
                <div className="sm muted mb-3">O que a secretária virtual está fazendo nesta conversa:</div>
                {DATA.aiSteps.map((s, i) => {
                  const st = stepState(i)
                  return (
                    <Fragment key={i}>
                      <div className={'ai-step ' + st}>
                        <div className="mk">{st === 'done' ? <Icon name="check" size={12} /> : i + 1}</div>
                        <div className="tx">{s.k}<small>{s.d}</small></div>
                      </div>
                      {i < DATA.aiSteps.length - 1 && <div className={'ai-conn' + (st === 'done' ? ' done' : '')}></div>}
                    </Fragment>
                  )
                })}
              </div>
              <div className="upper mb-2">Ação sugerida</div>
              <div className="card pad" style={{ background: sugestao.tipo === 'ok' ? 'var(--success-weak)' : 'var(--surface-2)', borderColor: sugestao.tipo === 'ok' ? 'var(--success-weak)' : 'var(--border)' }}>
                <div className="sm b mb-2">{sugestao.txt}</div>
                {sugestao.btn && (
                  <div className="row gap-2">
                    <Button variant={sugestao.tipo === 'acao' ? 'whats' : 'primary'} size="sm"
                      onClick={() => { send(sugestao.tipo === 'acao' ? 'Confirmado! Sua consulta foi remarcada. ✅' : 'Olá! Como posso ajudar?'); onToast('Resposta enviada ao paciente', 'send') }}>
                      {sugestao.btn}
                    </Button>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
