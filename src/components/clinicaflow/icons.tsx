/* Ícones stroke (estilo Lucide) usados em todo o ClinicaFlow.
 * Portado de window.ICONS / <Icon> do protótipo, sem alteração de traçado. */
import type { CSSProperties } from 'react'

export const ICONS = {
  search: 'M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0 M21 21l-4.3-4.3',
  grid: 'M4 4h7v7H4z M13 4h7v7h-7z M13 13h7v7h-7z M4 13h7v7H4z',
  chat: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  calendar: 'M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18',
  plug: 'M9 2v6 M15 2v6 M6 8h12v3a6 6 0 0 1-12 0z M12 17v5',
  stetho: 'M4 3v5a4 4 0 0 0 8 0V3 M8 17a5 5 0 0 0 10 0v-2 M18 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  pillIc: 'M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z M8.5 8.5l7 7',
  video: 'M23 7l-7 5 7 5V7z M1 5h15v14H1z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6',
  card: 'M2 5h20v14H2z M2 10h20',
  box: 'M21 8l-9-5-9 5 9 5 9-5z M3 8v8l9 5 9-5V8 M12 13v8',
  chart: 'M3 3v18h18 M7 15l4-4 3 3 5-6',
  mega: 'M3 11l18-5v12L3 14v-3z M11.6 16.8a3 3 0 1 1-5.8-1.6',
  check: 'M20 6 9 17l-5-5',
  arrowR: 'M5 12h14 M13 6l6 6-6 6',
  chevD: 'M6 9l6 6 6-6',
  chevR: 'M9 6l6 6-6 6',
  send: 'M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z',
  mail: 'M4 4h16v16H4z M22 6l-10 7L2 6',
  sparkles: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z',
  x: 'M18 6 6 18 M6 6l12 12',
  clock: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0 M12 7v5l3 2',
  plus: 'M12 5v14 M5 12h14',
  lock: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
  refresh: 'M23 4v6h-6 M1 20v-6h6 M3.5 9a9 9 0 0 1 14.8-3.4L23 10 M1 14l4.7 4.4A9 9 0 0 0 20.5 15',
  filter: 'M22 3H2l8 9.5V19l4 2v-8.5z',
  ext: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14 21 3',
  smile: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0 M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01',
  clip: 'M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.2a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  hand: 'M18 11V6a2 2 0 0 0-4 0 M14 10V4a2 2 0 0 0-4 0v2 M10 10.5V6a2 2 0 0 0-4 0v8 M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15',
  building: 'M4 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18 M9 7h2 M9 11h2 M9 15h2 M16 8h2a2 2 0 0 1 2 2v12',
  dot: 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  trend: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
}

export type IconName = keyof typeof ICONS

interface IconProps {
  name: IconName
  size?: number
  stroke?: number
  style?: CSSProperties
  className?: string
}

export function Icon({ name, size = 18, stroke = 2, style, className }: IconProps) {
  const d = ICONS[name]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style} className={className} aria-hidden="true">
      {d.split(' M').map((seg, i) => <path key={i} d={(i ? 'M' : '') + seg} />)}
    </svg>
  )
}
