/* Painel "Tweaks" — cor de destaque, cantos e sombra (host de edição) */
import { Icon } from './icons'

export interface Accent {
  key: string
  label: string
  accent: string
  hover: string
  active: string
  weak: string
  weak2: string
}

export const ACCENTS: Accent[] = [
  {
    key: 'blue',
    label: 'Airtable',
    accent: '#1b61c9',
    hover: '#1a57b3',
    active: '#15498f',
    weak: '#eaf1fc',
    weak2: '#dbe8fb',
  },
  {
    key: 'royal',
    label: 'Royal',
    accent: '#254fad',
    hover: '#1f4496',
    active: '#1a3a82',
    weak: '#e9eefb',
    weak2: '#d6e0f7',
  },
  {
    key: 'teal',
    label: 'Teal',
    accent: '#0d8f86',
    hover: '#0b7b73',
    active: '#096860',
    weak: '#e1f4f2',
    weak2: '#c9ebe7',
  },
  {
    key: 'violet',
    label: 'Violeta',
    accent: '#6d45c9',
    hover: '#5e3ab0',
    active: '#4f3196',
    weak: '#efeafc',
    weak2: '#e2d8f7',
  },
]
export const RADII: Record<string, Record<string, string>> = {
  suave: { '--r-xs': '8px', '--r-sm': '10px', '--r': '12px', '--r-md': '16px', '--r-lg': '20px' },
  reto: { '--r-xs': '4px', '--r-sm': '5px', '--r': '6px', '--r-md': '8px', '--r-lg': '10px' },
}

interface TweaksPanelProps {
  open: boolean
  onClose: () => void
  accent: string
  setAccent: (v: string) => void
  radius: string
  setRadius: (v: string) => void
  shadow: string
  setShadow: (v: string) => void
}

export function TweaksPanel({
  open,
  onClose,
  accent,
  setAccent,
  radius,
  setRadius,
  shadow,
  setShadow,
}: TweaksPanelProps) {
  return (
    <div id="tweaks" className={open ? 'show' : ''}>
      <div className="tw-h">
        <span>Tweaks</span>
        <button className="icon-btn" onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <div className="tw-b">
        <div className="tw-sec">Cor de destaque</div>
        <div className="sw-row">
          {ACCENTS.map((a) => (
            <div
              key={a.key}
              className={'sw-opt' + (accent === a.key ? ' on' : '')}
              title={a.label}
              style={{ background: a.accent }}
              onClick={() => setAccent(a.key)}
            ></div>
          ))}
        </div>
        <div className="tw-sec">Cantos</div>
        <div className="seg">
          <button className={radius === 'suave' ? 'on' : ''} onClick={() => setRadius('suave')}>
            Suave
          </button>
          <button className={radius === 'reto' ? 'on' : ''} onClick={() => setRadius('reto')}>
            Reto
          </button>
        </div>
        <div className="tw-sec">Sombra dos cards</div>
        <div className="seg">
          <button className={shadow === 'sutil' ? 'on' : ''} onClick={() => setShadow('sutil')}>
            Sutil
          </button>
          <button className={shadow === 'plana' ? 'on' : ''} onClick={() => setShadow('plana')}>
            Plana
          </button>
        </div>
      </div>
    </div>
  )
}
