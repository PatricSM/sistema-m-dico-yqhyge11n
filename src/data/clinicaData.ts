/* Dados mock do ClinicaFlow (portado de window.DATA do protótipo).
 * Conteúdo idêntico ao original — apenas tipado para a stack TypeScript. */
import type { IconName } from '@/components/clinicaflow/icons'

export type StatusKey =
  | 'novo'
  | 'em_conversa'
  | 'aguardando_atendente'
  | 'qualificado'
  | 'agendado'
  | 'resolvida'

export interface Contact {
  id: number
  nome: string
  iniciais: string
  cor: string
  fone: string
  email: string
  nascimento: string
  cpf: string
  pacienteFeegow: number | null
  convenio: string
  plano: string
  unidade: string
  origem: string
  status: StatusKey
  criado: string
  agendamento?: number
}

export interface Message {
  de: 'in' | 'out' | 'bot'
  txt: string
  t: string
  opts?: string[]
}

export interface Conversation {
  id: number
  contatoId: number
  estado: StatusKey
  controlador: 'humano' | 'ia'
  preview: string
  hora: string
  tempo: string
  naoLidas: number
  intencao: string
  etapaIA: number
  mensagens: Message[]
}

export interface AiStep {
  k: string
  d: string
}

export interface Profissional {
  nome: string
  iniciais: string
  cor: string
  esp: string
}

export interface Dia {
  dn: string
  dd: string
  today?: boolean
}

export interface Slot {
  h: string
  off?: boolean
}

export interface StatusInfo {
  label: string
  cls: string
}

export interface Modelo {
  k: string
  nome: string
  d: string
  insp: string
  tag: string
  padrao?: boolean
}

export interface Intent {
  id: string
  nome: string
  fluxo: string
  on: boolean
}

export type ToolRow = [nm: string, ep: string, tipo: string]
export type KbItem = [ic: IconName, t: string, d: string]
export type OnboardingItem = [t: string, d: string, st: 'done' | 'now' | 'todo']
export type EndpointRow = [verb: string, path: string, use: string]
export type ModuloEmBreve = [emoji: string, nome: string, desc: string]

const contacts: Record<number, Contact> = {
  1042: {
    id: 1042, nome: 'Marina Alves', iniciais: 'MA', cor: '#7c5cd6',
    fone: '+55 11 99421-2381', email: 'marina.alves@email.com',
    nascimento: '12/03/1990', cpf: '•••.•••.321-00',
    pacienteFeegow: 88120, convenio: 'Bradesco Saúde', plano: 'Nacional Flex',
    unidade: 'Centro', origem: 'WhatsApp', status: 'qualificado', criado: 'hoje 09:41',
  },
  1043: {
    id: 1043, nome: 'Carla Freitas', iniciais: 'CF', cor: '#1ba59b',
    fone: '+55 11 98330-7744', email: 'carla.f@email.com',
    nascimento: '04/08/1985', cpf: '•••.•••.112-09',
    pacienteFeegow: 90233, convenio: 'Amil', plano: 'Amil 400',
    unidade: 'Centro', origem: 'WhatsApp', status: 'em_conversa', criado: 'hoje 09:58',
  },
  1044: {
    id: 1044, nome: 'João Santos', iniciais: 'JS', cor: '#e08332',
    fone: '+55 11 99110-5520', email: 'joao.santos@email.com',
    nascimento: '23/11/1972', cpf: '•••.•••.880-21',
    pacienteFeegow: 71004, convenio: 'Particular', plano: '—',
    unidade: 'Centro', origem: 'WhatsApp', status: 'agendado', criado: 'hoje 09:20', agendamento: 339201,
  },
  1045: {
    id: 1045, nome: 'Rafael Pinto', iniciais: 'RP', cor: '#d6457f',
    fone: '+55 11 98821-9032', email: '—',
    nascimento: '—', cpf: '—',
    pacienteFeegow: null, convenio: '—', plano: '—',
    unidade: '—', origem: 'WhatsApp', status: 'novo', criado: 'hoje 09:14',
  },
  1046: {
    id: 1046, nome: 'Lucas Barros', iniciais: 'LB', cor: '#0a7d3f',
    fone: '+55 11 99650-1188', email: 'lucasb@email.com',
    nascimento: '17/06/1995', cpf: '•••.•••.450-77',
    pacienteFeegow: 66510, convenio: 'SulAmérica', plano: 'Especial 100',
    unidade: 'Jardins', origem: 'WhatsApp', status: 'agendado', criado: 'ontem 16:02', agendamento: 338990,
  },
}

const conversations: Conversation[] = [
  {
    id: 1, contatoId: 1042, estado: 'aguardando_atendente', controlador: 'humano',
    preview: 'Pode ser quinta às 11? Mas queria confirmar com atendente', hora: '09:43', tempo: 'agora', naoLidas: 1,
    intencao: 'remarcar', etapaIA: 4,
    mensagens: [
      { de: 'in', txt: 'Oi! Quero remarcar minha consulta de dermatologia', t: '09:41' },
      { de: 'bot', txt: 'Claro, Marina! Encontrei sua consulta de Dermatologia em 03/06 às 10:00. Deseja remarcar essa?', t: '09:41', opts: ['Sim, remarcar essa', 'É outra consulta'] },
      { de: 'in', txt: 'Sim, essa mesma', t: '09:42' },
      { de: 'bot', txt: 'Perfeito. Tenho estes horários com a Dra. Helena (Dermatologia):', t: '09:42', opts: ['Qui 05/06 · 09:30', 'Qui 05/06 · 11:00', 'Sex 06/06 · 14:30'] },
      { de: 'in', txt: 'Pode ser quinta às 11? Mas queria confirmar com atendente', t: '09:43' },
    ],
  },
  {
    id: 2, contatoId: 1043, estado: 'em_conversa', controlador: 'ia',
    preview: 'Pode ser quinta de manhã 🙂', hora: '09:59', tempo: '12min', naoLidas: 0,
    intencao: 'agendar', etapaIA: 5,
    mensagens: [
      { de: 'in', txt: 'Oi, tem horário pra nutrição essa semana?', t: '09:58' },
      { de: 'bot', txt: 'Oi, Carla! Tenho sim. Você prefere de manhã ou à tarde?', t: '09:58', opts: ['Manhã', 'Tarde'] },
      { de: 'in', txt: 'Pode ser quinta de manhã 🙂', t: '09:59' },
      { de: 'bot', txt: 'Tenho estes horários de nutrição na quinta pela manhã:', t: '09:59', opts: ['Qui 05/06 · 08:30', 'Qui 05/06 · 09:15', 'Qui 05/06 · 10:00'] },
    ],
  },
  {
    id: 3, contatoId: 1044, estado: 'agendado', controlador: 'ia',
    preview: '✓ Agendado: Cardiologia 04/06 14:30', hora: '09:25', tempo: '20min', naoLidas: 0,
    intencao: 'agendar', etapaIA: 7,
    mensagens: [
      { de: 'in', txt: 'Bom dia, quero marcar cardiologista', t: '09:20' },
      { de: 'bot', txt: 'Bom dia, João! É particular ou por convênio?', t: '09:20', opts: ['Particular', 'Convênio'] },
      { de: 'in', txt: 'Particular', t: '09:21' },
      { de: 'bot', txt: 'Tenho amanhã 04/06 às 14:30 com Dr. Mendes (Cardiologia), valor R$ 380. Confirmo?', t: '09:22', opts: ['Confirmar', 'Ver outros horários'] },
      { de: 'in', txt: 'Confirmar', t: '09:24' },
      { de: 'bot', txt: '✅ Pronto, João! Consulta de Cardiologia confirmada para 04/06 às 14:30 com Dr. Mendes. Protocolo #339201.', t: '09:25' },
    ],
  },
  {
    id: 4, contatoId: 1045, estado: 'aguardando_atendente', controlador: 'humano',
    preview: 'Bom dia, gostaria de marcar um exame', hora: '09:14', tempo: '28min', naoLidas: 2,
    intencao: 'duvida', etapaIA: 1,
    mensagens: [
      { de: 'in', txt: 'Bom dia, gostaria de marcar um exame', t: '09:14' },
      { de: 'bot', txt: 'Bom dia! Para te ajudar, qual exame você precisa? Se preferir, posso te transferir para a recepção.', t: '09:14', opts: ['Falar com atendente'] },
      { de: 'in', txt: 'Falar com atendente', t: '09:15' },
    ],
  },
  {
    id: 5, contatoId: 1046, estado: 'resolvida', controlador: 'ia',
    preview: 'Obrigado! 👍', hora: 'ontem', tempo: '1d', naoLidas: 0,
    intencao: 'agendar', etapaIA: 7,
    mensagens: [
      { de: 'in', txt: 'Quero remarcar pro dia 10', t: 'ontem 15:58' },
      { de: 'bot', txt: 'Remarcado para 10/06 às 09:00. Tudo certo!', t: 'ontem 16:01' },
      { de: 'in', txt: 'Obrigado! 👍', t: 'ontem 16:02' },
    ],
  },
]

// step labels for the AI pipeline
const aiSteps: AiStep[] = [
  { k: 'Mensagem recebida', d: 'webhook do provedor' },
  { k: 'Contato identificado', d: 'vinculado ao CRM' },
  { k: 'Intenção classificada', d: 'agendar / remarcar / cancelar' },
  { k: 'Coleta de dados', d: 'especialidade, convênio, preferência' },
  { k: 'Disponibilidade', d: 'GET /appoints/available-schedule' },
  { k: 'Oferta de horários', d: 'mensagem interativa' },
  { k: 'Agendamento gravado', d: 'POST /appoints/new-appoint' },
]

const especialidades = ['Dermatologia', 'Cardiologia', 'Nutrição', 'Clínico geral', 'Ortopedia', 'Ginecologia']
const unidades = ['Centro', 'Jardins', 'Zona Sul']
const convenios = ['Particular', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'Unimed']

const profissionais: Profissional[] = [
  { nome: 'Dra. Helena Costa', iniciais: 'HC', cor: '#7c5cd6', esp: 'Dermatologia' },
  { nome: 'Dr. Paulo Mendes', iniciais: 'PM', cor: '#1b61c9', esp: 'Dermatologia' },
]

// disponibilidade por profissional / dia (índice 0..4 = seg..sex)
// valores: array de {h, off}
const dias: Dia[] = [
  { dn: 'Seg', dd: '02' }, { dn: 'Ter', dd: '03' }, { dn: 'Qua', dd: '04' },
  { dn: 'Qui', dd: '05', today: true }, { dn: 'Sex', dd: '06' },
]
const grade: Record<string, Slot[][]> = {
  'Dra. Helena Costa': [
    [{ h: '09:30', off: true }, { h: '11:00' }],
    [{ h: '08:00' }, { h: '14:30', off: true }],
    [{ h: '10:00' }, { h: '15:30' }],
    [{ h: '09:30' }, { h: '11:00' }, { h: '13:30' }],
    [{ h: '09:00' }, { h: '14:30', off: true }],
  ],
  'Dr. Paulo Mendes': [
    [{ h: '08:30' }, { h: '13:00' }],
    [{ h: '09:00', off: true }],
    [{ h: '11:30' }, { h: '16:00' }],
    [{ h: '10:30' }, { h: '14:00' }],
    [{ h: '08:00' }, { h: '15:00' }, { h: '17:00' }],
  ],
}

const endpointsAtivos: EndpointRow[] = [
  ['get', '/patient/search', 'Identificar/validar paciente'],
  ['get', '/patient/informations', 'Detalhes do paciente'],
  ['post', '/patient/new', 'Criar paciente (se novo)'],
  ['get', '/specialties/list', 'Listar especialidades'],
  ['get', '/procedures/list', 'Listar procedimentos'],
  ['get', '/company/list-unity', 'Listar unidades'],
  ['get', '/insurance/list', 'Listar convênios'],
  ['get', '/professional/list', 'Listar profissionais'],
  ['get', '/appoints/available-schedule', 'Disponibilidade de horários'],
  ['post', '/appoints/new-appoint', 'Criar agendamento'],
  ['get', '/appoints/search', 'Listar/validar agendamentos'],
  ['post', '/appoints/statusUpdate', 'Atualizar status (confirmar)'],
  ['post', '/appoints/cancel-appoint', 'Cancelar agendamento'],
  ['post', '/appoints/reschedule', 'Remarcar agendamento'],
]
const modulosEmBreve: ModuloEmBreve[] = [
  ['🔒', 'Bloqueios', 'GET /lock/list'],
  ['🎟️', 'Cartão de Benefício', '/external/contract · /external/plan'],
  ['📦', 'Estoque', 'entrada · saída · posição · movimentação'],
  ['📄', 'Faturamento (TISS)', 'buscar / editar / inserir guia'],
  ['💳', 'Financeiro', 'pagar agendamento · vendas · NFS-e'],
  ['🧪', 'Laudos', 'listar · registrar · visualizar'],
  ['📁', 'Pacientes — extras', 'upload prontuário · exames · dependentes'],
  ['🗂️', 'Procedimentos — extras', 'pacotes · grupos · convênios'],
  ['📝', 'Propostas', 'listar · criar · mudar status'],
  ['📊', 'Relatórios', 'listar · gerar relatório'],
]

const statusMap: Record<string, StatusInfo> = {
  novo: { label: 'novo', cls: 'outline' },
  em_conversa: { label: 'em conversa', cls: 'blue' },
  aguardando_atendente: { label: 'aguardando atendente', cls: 'amber' },
  qualificado: { label: 'qualificado', cls: 'blue' },
  agendado: { label: 'agendado', cls: 'green' },
  resolvida: { label: 'resolvida', cls: 'green' },
}

const modelos: Modelo[] = [
  { k: 'A', nome: 'Fluxo guiado', d: 'Menu e seletores (especialidade → profissional → data → horário), sem linguagem natural.', insp: 'Nina / WhatsApp Flows', tag: 'previsível, rígido' },
  { k: 'B', nome: 'Agente generativo', d: 'IA conversacional que entende linguagem aberta e responde dúvidas.', insp: 'Cloudia', tag: 'flexível, exige controle' },
  { k: 'C', nome: 'Híbrido', d: 'IA generativa na entrada/dúvidas + transição para fluxo estruturado na efetivação.', insp: 'Convergência de mercado', tag: 'recomendado', padrao: true },
]

const intents: Intent[] = [
  { id: 'agendar', nome: 'Agendar', fluxo: 'Coleta guiada + disponibilidade Feegow + efetivação', on: true },
  { id: 'remarcar', nome: 'Remarcar', fluxo: 'Identificar agendamento + reschedule', on: true },
  { id: 'cancelar', nome: 'Cancelar', fluxo: 'Identificar agendamento + cancel-appoint', on: true },
  { id: 'duvida', nome: 'Dúvida / informação', fluxo: 'Resposta via base de conhecimento', on: true },
  { id: 'humano', nome: 'Falar com humano', fluxo: 'Handoff para atendente', on: true },
  { id: 'outro', nome: 'Outro', fluxo: 'Pergunta de desambiguação', on: true },
]

const tools: ToolRow[] = [
  ['consultar_disponibilidade', 'GET /appoints/available-schedule', 'leitura'],
  ['buscar_paciente', 'GET /patient/search', 'leitura'],
  ['listar_especialidades', 'GET /specialties/list', 'leitura'],
  ['listar_profissionais', 'GET /professional/list', 'leitura'],
  ['listar_convenios', 'GET /insurance/list', 'leitura'],
  ['listar_unidades', 'GET /company/list-unity', 'leitura'],
  ['criar_paciente', 'POST /patient/new', 'escrita'],
  ['criar_agendamento', 'POST /appoints/new-appoint', 'escrita'],
  ['remarcar_agendamento', 'POST /appoints/reschedule', 'escrita'],
  ['cancelar_agendamento', 'POST /appoints/cancel-appoint', 'escrita'],
  ['atualizar_status', 'POST /appoints/statusUpdate', 'escrita'],
]

const kbItens: KbItem[] = [
  ['building', 'Endereços e unidades', '3 unidades · horários de funcionamento'],
  ['clock', 'Horários de atendimento', 'por unidade e especialidade'],
  ['card', 'Convênios e particular', '5 convênios aceitos'],
  ['file', 'Valores', 'consultas e procedimentos particulares'],
  ['pillIc', 'Preparo de exames', '12 orientações pré-consulta'],
  ['chat', 'FAQ', '24 perguntas frequentes'],
]

const onboarding: OnboardingItem[] = [
  ['Conectar o WhatsApp', 'Cloud API (Meta) · número verificado', 'done'],
  ['Conectar o Feegow', 'token validado em /specialties/list', 'done'],
  ['Sincronizar dados do Feegow', 'especialidades, profissionais, convênios, unidades', 'done'],
  ['Preencher a base de conhecimento', 'endereços, valores, FAQ, preparo', 'done'],
  ['Configurar persona e prompt', 'nome, tom, regras', 'done'],
  ['Definir roteamento e handoff', 'intenções e gatilhos de transferência', 'done'],
  ['Testar em ambiente controlado', 'simular agendar / remarcar / dúvida / handoff', 'now'],
  ['Ativar (go-live) e monitorar', 'inbox, logs de tools, métricas', 'todo'],
]

export const DATA = {
  contacts, conversations, aiSteps, especialidades, unidades, convenios,
  profissionais, dias, grade, endpointsAtivos, modulosEmBreve, statusMap,
  modelos, intents, tools, kbItens, onboarding,
}

export default DATA
