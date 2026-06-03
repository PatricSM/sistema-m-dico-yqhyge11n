/* Tela — Agente de IA (configuração) */
import { useState, type CSSProperties, type ReactNode } from 'react'
import { DATA } from '@/data/clinicaData'
import { Icon, type IconName } from '../icons'
import { Pill } from '../ui/Pill'
import { Button } from '../ui/Button'
import { Switch } from '../ui/Switch'
import type { NavigateFn, ToastFn } from '../types'

interface AgenteProps {
  onNavigate: NavigateFn
  onToast: ToastFn
}

export function ScreenAgente({ onNavigate, onToast }: AgenteProps) {
  const [section, setSection] = useState('visao')
  const [modelo, setModelo] = useState('C')
  const [nome, setNome] = useState('Sofia')
  const [tom, setTom] = useState('Neutro')
  const [saud, setSaud] = useState(
    'Olá! 👋 Sou a Sofia, assistente da Clínica Centro. Posso te ajudar a agendar, remarcar ou tirar dúvidas. Como posso ajudar hoje?',
  )
  const [intents, setIntents] = useState(() => DATA.intents.map((i) => ({ ...i })))
  const [tools, setTools] = useState(() =>
    DATA.tools.map((t) => ({ nm: t[0], ep: t[1], tipo: t[2], on: true })),
  )
  const [handoff, setHandoff] = useState<Record<string, boolean>>({
    pedido: true,
    auto: true,
    devolver: true,
    sofrimento: true,
    reclamacao: true,
    escopo: true,
    falha: true,
  })
  const [multi, setMulti] = useState({
    varias: true,
    resolver: true,
    avaliacao: true,
    restricoes: true,
  })

  const NAV: [string, IconName, string][] = [
    ['visao', 'grid', 'Visão geral'],
    ['modelo', 'sparkles', 'Modelo de conversa'],
    ['base', 'file', 'Base de conhecimento'],
    ['persona', 'chat', 'Persona & prompt'],
    ['intents', 'filter', 'Roteador de intenção'],
    ['tools', 'settings', 'Ferramentas'],
    ['handoff', 'hand', 'Handoff humano'],
    ['multi', 'calendar', 'Multi-agenda'],
  ]

  const SecHead = ({ t, s }: { t: string; s?: string }) => (
    <div className="sec-head">
      <div className="sec-title">{t}</div>
      {s && <div className="sec-sub">{s}</div>}
    </div>
  )
  const CRow = ({ t, d, children }: { t: string; d?: string; children: ReactNode }) => (
    <div className="crow">
      <div className="lab">
        <div className="t">{t}</div>
        {d && <div className="d">{d}</div>}
      </div>
      {children}
    </div>
  )

  const kpi = (lbl: string, n: number | string, color: string, sub: string) => (
    <div className="card kpi">
      <div className="lbl">{lbl}</div>
      <div className="n" style={{ color }}>
        {n}
      </div>
      <div className="trend muted">{sub}</div>
    </div>
  )

  // ---------- sections ----------
  const sections: Record<string, () => ReactNode> = {
    visao: () => (
      <div className="col gap-5">
        <SecHead t="Visão geral" s="Estado do agente, progresso de configuração e desempenho." />
        <div className="card pad">
          <div className="row between wrap gap-3">
            <div className="row gap-3">
              <div
                className="av lg"
                style={{ background: 'linear-gradient(140deg, var(--accent), #2f7ce0)' }}
              >
                <Icon name="sparkles" size={22} />
              </div>
              <div>
                <div className="row gap-2">
                  <h2 className="t-h2">{nome}</h2>
                  <Pill tone="amber">
                    <span className="dot"></span>em testes
                  </Pill>
                </div>
                <div className="muted sm mt-1">
                  Secretária virtual · Modelo Híbrido · WhatsApp Cloud API · Feegow conectado
                </div>
              </div>
            </div>
            <div className="row gap-2">
              <Button
                icon="chat"
                onClick={() => onToast('Sandbox aberto — nada é gravado no Feegow', 'sparkles')}
              >
                Testar em sandbox
              </Button>
              <Button
                variant="whats"
                icon="check"
                onClick={() => onToast('Agente ativado (go-live)', 'check')}
              >
                Ativar agente
              </Button>
            </div>
          </div>
        </div>

        <div className="kpi-grid">
          {kpi('Conversas atendidas · hoje', 46, 'var(--fg)', '9 em andamento')}
          {kpi('Conversão em agendamento', '61%', 'var(--success)', '28 de 46')}
          {kpi('Handoffs p/ humano', 7, 'var(--warn)', '15% das conversas')}
          {kpi('Falhas de tool', 1, 'var(--danger)', '1× conflito 409 reofertado')}
        </div>

        <div className="card pad">
          <div className="card-h">
            <div className="t">Configuração do agente</div>
            <Pill tone="blue">6 de 8 etapas</Pill>
          </div>
          {DATA.onboarding.map(([t, d, st], i) => (
            <div className={'ob ' + st} key={i}>
              <div className="mk">{st === 'done' ? <Icon name="check" size={13} /> : i + 1}</div>
              <div className="grow">
                <div className="b sm">{t}</div>
                <div className="tiny muted">{d}</div>
              </div>
              {st === 'now' ? (
                <Button size="xs" variant="primary" onClick={() => onNavigate('conexoes')}>
                  Continuar
                </Button>
              ) : st === 'todo' ? (
                <Pill tone="outline">pendente</Pill>
              ) : (
                <span className="sm" style={{ color: 'var(--success)' }}>
                  concluído
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    ),

    modelo: () => (
      <div className="col gap-5">
        <SecHead
          t="Modelo de conversa"
          s="Como o agente conduz o diálogo. O padrão é o Híbrido: linguagem natural na entrada, fluxo estruturado na efetivação."
        />
        <div className="model-grid">
          {DATA.modelos.map((m) => (
            <div
              key={m.k}
              className={'model-card' + (modelo === m.k ? ' sel' : '')}
              onClick={() => setModelo(m.k)}
            >
              {modelo === m.k && (
                <span className="check">
                  <Icon name="check" size={18} />
                </span>
              )}
              <div className="mtag">{m.k}</div>
              <div className="row gap-2 mb-1">
                <span className="bb">{m.nome}</span>
                {m.padrao && <Pill tone="blue">padrão</Pill>}
              </div>
              <div className="muted sm">{m.d}</div>
              <div className="mt-3 tiny faint">inspiração: {m.insp}</div>
              <div className="mt-1">
                <Pill tone="outline">{m.tag}</Pill>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="upper mb-2">Transição (modelo híbrido)</div>
          <div className="flowbar">
            <div className="node gen">
              <Icon name="chat" size={15} style={{ color: 'var(--accent)' }} />
              Linguagem natural<span className="tiny muted">entrada & dúvidas</span>
            </div>
            <Icon name="arrowR" size={18} style={{ color: 'var(--faint)' }} />
            <div className="node struct">
              <Icon name="filter" size={15} style={{ color: 'var(--success)' }} />
              Fluxo estruturado
              <span className="tiny muted">especialidade → profissional → data → horário</span>
            </div>
            <Icon name="arrowR" size={18} style={{ color: 'var(--faint)' }} />
            <div className="node">
              <Icon name="check" size={15} style={{ color: 'var(--success)' }} />
              Grava no Feegow
            </div>
          </div>
          <div className="note-box info mt-3">
            <Icon name="sparkles" size={16} style={{ flexShrink: 0 }} />A transição para opções
            estruturadas ocorre <b>antes</b> da escolha de especialidade/horário, garantindo entrada
            limpa para o <span className="mono">POST /appoints/new-appoint</span>.
          </div>
        </div>
      </div>
    ),

    base: () => (
      <div className="col gap-5">
        <SecHead
          t="Base de conhecimento"
          s="Informação factual da clínica que alimenta o agente e evita alucinação. Editável sem código."
        />
        <div className="card pad">
          <div className="row between wrap gap-3">
            <div>
              <div className="b">Sincronizar do Feegow</div>
              <div className="muted sm mt-1">
                Especialidades, profissionais, convênios e unidades — sem cadastro manual.
              </div>
            </div>
            <Button
              variant="primary"
              icon="refresh"
              onClick={() =>
                onToast(
                  'Sincronizado do Feegow: 6 especialidades, 14 profissionais, 5 convênios, 3 unidades',
                  'refresh',
                )
              }
            >
              Sincronizar agora
            </Button>
          </div>
          <div className="row gap-2 wrap mt-3">
            <Pill tone="blue">6 especialidades</Pill>
            <Pill tone="blue">14 profissionais</Pill>
            <Pill tone="blue">5 convênios</Pill>
            <Pill tone="blue">3 unidades</Pill>
          </div>
        </div>
        <div>
          <div className="upper mb-2">Conteúdo da clínica</div>
          <div className="col gap-2">
            {DATA.kbItens.map(([ic, t, d], i) => (
              <div className="kb" key={i}>
                <div className="ic">
                  <Icon name={ic} size={18} />
                </div>
                <div className="grow">
                  <div className="b sm">{t}</div>
                  <div className="tiny muted">{d}</div>
                </div>
                <Button size="xs" variant="ghost" iconRight="chevR">
                  Editar
                </Button>
              </div>
            ))}
          </div>
          <div className="note-box info mt-3">
            <Icon name="sparkles" size={16} style={{ flexShrink: 0 }} />
            Dados voláteis (disponibilidade de horários) vêm sempre da <b>
              chamada de ferramenta
            </b>{' '}
            em tempo real, nunca da base estática.
          </div>
        </div>
      </div>
    ),

    persona: () => (
      <div className="col gap-5">
        <SecHead
          t="Persona & prompt"
          s="Nome, tom de voz e regras de comportamento do agente. Versionado, com rollback."
        />
        <div className="card pad col gap-4">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="field">
              <label>Nome do agente</label>
              <input className="input" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="field">
              <label>Tom de voz</label>
              <div className="seg">
                {['Formal', 'Neutro', 'Informal'].map((t) => (
                  <button key={t} className={tom === t ? 'on' : ''} onClick={() => setTom(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="field">
            <label>Saudação</label>
            <textarea
              className="ta"
              rows={3}
              value={saud}
              onChange={(e) => setSaud(e.target.value)}
            />
          </div>
        </div>

        <div className="card pad">
          <div className="card-h">
            <div className="t">Regras de comportamento</div>
          </div>
          {[
            ['Conduzir agendamento', 'quando a intenção for agendar, remarcar ou cancelar'],
            ['Responder dúvidas pela base de conhecimento', 'sem inventar dados factuais'],
            ['Transferir para humano', 'sob pedido do paciente ou gatilho configurado'],
          ].map(([t, d], i) => (
            <div className="rule crow" key={i}>
              <div className="lab">
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
              <Pill tone="green">
                <Icon name="check" size={11} />
                ativa
              </Pill>
            </div>
          ))}
        </div>

        <div className="note-box">
          <Icon name="lock" size={16} style={{ flexShrink: 0 }} />
          <div>
            <b>Nunca fazer:</b> dar orientação clínica/diagnóstica · prometer horário não confirmado
            · inventar valores ou convênios. Perguntas clínicas são redirecionadas ao profissional.
          </div>
        </div>

        <div className="row between card pad">
          <div className="sm">
            <b>Versão do prompt:</b> <span className="mono">v3</span> · salvo há 2 dias
          </div>
          <Button size="sm" icon="refresh">
            Histórico / rollback
          </Button>
        </div>
      </div>
    ),

    intents: () => (
      <div className="col gap-5">
        <SecHead
          t="Roteador de intenção"
          s="Cada mensagem é classificada e dispara o fluxo correspondente. Intenção ambígua gera desambiguação — nunca uma suposição."
        />
        <div className="card">
          {intents.map((it, i) => (
            <div
              className="crow"
              key={it.id}
              style={{ padding: '14px 18px', borderTop: i ? '1px solid var(--border-2)' : 'none' }}
            >
              <div className="lab">
                <div className="t">{it.nome}</div>
                <div className="d">→ {it.fluxo}</div>
              </div>
              <Switch
                on={it.on}
                onChange={(v) =>
                  setIntents((s) => s.map((x) => (x.id === it.id ? { ...x, on: v } : x)))
                }
              />
            </div>
          ))}
        </div>
        <div className="note-box info">
          <Icon name="filter" size={16} style={{ flexShrink: 0 }} />
          Intenção ambígua → <b>pergunta de desambiguação</b>, nunca uma ação irreversível baseada
          em suposição.
        </div>
      </div>
    ),

    tools: () => (
      <div className="col gap-5">
        <SecHead
          t="Ferramentas (function calling)"
          s="O agente age chamando ferramentas que mapeiam os endpoints do Feegow. Ferramentas de escrita exigem dados completos e confirmação."
        />
        <div className="card">
          <div className="tool-head" style={{ paddingTop: 14 }}>
            <span>Ferramenta</span>
            <span>Tipo</span>
            <span>Confirmação</span>
            <span></span>
          </div>
          <div className="divider"></div>
          {tools.map((t) => (
            <div className="tool" key={t.nm}>
              <div>
                <div className="nm mono" style={{ fontSize: 13 }}>
                  {t.nm}
                </div>
                <div className="epp">{t.ep}</div>
              </div>
              <span
                className={'tipo'}
                style={{ color: t.tipo === 'escrita' ? 'var(--warn)' : 'var(--accent)' }}
              >
                {t.tipo === 'escrita' ? '✎ escrita' : '↧ leitura'}
              </span>
              <span>
                {t.tipo === 'escrita' ? (
                  <Pill tone="amber">requer</Pill>
                ) : (
                  <span className="tiny faint">—</span>
                )}
              </span>
              <Switch
                on={t.on}
                onChange={(v) =>
                  setTools((s) => s.map((x) => (x.nm === t.nm ? { ...x, on: v } : x)))
                }
              />
            </div>
          ))}
        </div>
        <div className="note-box info">
          <Icon name="refresh" size={16} style={{ flexShrink: 0 }} />
          Erros das tools são tratados no fluxo conversacional: <b>HTTP 409</b> (horário ocupado)
          reoferta horários, em vez de falhar silenciosamente. Toda chamada é logada para auditoria.
        </div>
      </div>
    ),

    handoff: () => (
      <div className="col gap-5">
        <SecHead
          t="Handoff humano"
          s="O paciente sempre pode pedir um atendente, e a clínica pode assumir a conversa preservando todo o contexto."
        />
        <div className="card pad">
          <CRow t="Permitir “falar com atendente”" d="disponível em qualquer ponto da conversa">
            <Switch
              on={handoff.pedido}
              onChange={(v) => setHandoff((h) => ({ ...h, pedido: v }))}
            />
          </CRow>
          <CRow
            t="Handoff automático em casos sensíveis"
            d="o agente transfere sozinho quando detecta os gatilhos abaixo"
          >
            <Switch on={handoff.auto} onChange={(v) => setHandoff((h) => ({ ...h, auto: v }))} />
          </CRow>
        </div>
        {handoff.auto && (
          <div className="card pad">
            <div className="upper mb-3">Gatilhos de transferência automática</div>
            <div className="row gap-2 wrap">
              {[
                ['sofrimento', 'Paciente em sofrimento'],
                ['reclamacao', 'Reclamação'],
                ['escopo', 'Assunto fora de escopo'],
                ['falha', 'Repetição de falha do agente'],
              ].map(([k, l]) => (
                <span
                  key={k}
                  className={'chip'}
                  style={
                    {
                      cursor: 'pointer',
                      borderColor: handoff[k] ? 'var(--accent)' : 'var(--border)',
                      background: handoff[k] ? 'var(--accent-weak)' : 'var(--surface)',
                      color: handoff[k] ? 'var(--accent)' : 'var(--muted)',
                      '--chip': handoff[k] ? 'var(--accent)' : 'var(--border-strong)',
                    } as CSSProperties
                  }
                  onClick={() => setHandoff((h) => ({ ...h, [k]: !h[k] }))}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="card pad">
          <CRow
            t="Devolver conversa ao agente"
            d="atendente pode retomar a automação após resolver o ponto"
          >
            <Switch
              on={handoff.devolver}
              onChange={(v) => setHandoff((h) => ({ ...h, devolver: v }))}
            />
          </CRow>
          <CRow
            t="Contexto entregue ao atendente"
            d="histórico completo + intenção e dados já coletados pelo agente"
          >
            <Pill tone="green">
              <Icon name="check" size={11} />
              sempre
            </Pill>
          </CRow>
        </div>
      </div>
    ),

    multi: () => (
      <div className="col gap-5">
        <SecHead
          t="Multi-agenda / multi-profissional"
          s="O agente opera com várias agendas e resolve corretamente especialidade e profissional antes de consultar a disponibilidade."
        />
        <div className="card pad">
          <CRow
            t="Operar com múltiplas agendas"
            d="vários profissionais e especialidades na mesma clínica"
          >
            <Switch on={multi.varias} onChange={(v) => setMulti((m) => ({ ...m, varias: v }))} />
          </CRow>
          <CRow
            t="Resolver especialidade/profissional antes da disponibilidade"
            d="perguntar quando necessário, antes de chamar available-schedule"
          >
            <Switch
              on={multi.resolver}
              onChange={(v) => setMulti((m) => ({ ...m, resolver: v }))}
            />
          </CRow>
          <CRow
            t="Conduzir consulta de avaliação primeiro"
            d="comum em particular — antes de tratar valores/procedimentos"
          >
            <Switch
              on={multi.avaliacao}
              onChange={(v) => setMulti((m) => ({ ...m, avaliacao: v }))}
            />
          </CRow>
          <CRow
            t="Respeitar restrições do Feegow"
            d="restrição de idade (age_from/age_to), convênio sem telemedicina, unidade específica"
          >
            <Switch
              on={multi.restricoes}
              onChange={(v) => setMulti((m) => ({ ...m, restricoes: v }))}
            />
          </CRow>
        </div>
      </div>
    ),
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="t-display">Agente de IA</h1>
          <p className="sub">
            Configure a secretária virtual que atende no WhatsApp e conduz o paciente até o
            agendamento no Feegow.
          </p>
        </div>
        <div className="row gap-2">
          <Pill tone="amber">
            <span className="dot"></span>em testes
          </Pill>
          <Button
            variant="primary"
            icon="chat"
            onClick={() => onToast('Sandbox aberto — simulação sem gravar no Feegow', 'sparkles')}
          >
            Testar em sandbox
          </Button>
        </div>
      </div>

      <div className="cfg">
        <nav className="cfg-nav">
          {NAV.map(([id, ic, lb], i) => (
            <div
              key={id}
              className={'it' + (section === id ? ' on' : '')}
              onClick={() => setSection(id)}
            >
              <span className="ic">
                <Icon name={ic} size={16} />
              </span>
              <span className="grow">{lb}</span>
              {id !== 'visao' && <span className="num">{i}</span>}
            </div>
          ))}
        </nav>
        <div>{sections[section]()}</div>
      </div>
    </div>
  )
}
