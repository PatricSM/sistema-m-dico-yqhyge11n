/* Tipos compartilhados do ClinicaFlow (rotas internas, navegação e toasts) */
import type { IconName } from './icons'

export type RouteId =
  | 'dashboard'
  | 'agente'
  | 'inbox'
  | 'contatos'
  | 'agendamento'
  | 'conexoes'

export type NavigateFn = (id: RouteId) => void

export type ToastFn = (msg: string, icon?: IconName) => void

export interface Toast {
  id: number
  msg: string
  icon?: IconName
}
