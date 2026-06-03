/* App raiz do ClinicaFlow: roteamento interno, modal "em breve", toasts e tweaks.
 * Portado do root app do protótipo (a montagem no DOM é feita pela stack/router). */
import { useCallback, useEffect, useState } from 'react'
import '@/styles/clinicaflow.css'
import { Sidebar } from './shell/Sidebar'
import { Topbar } from './shell/Topbar'
import { ScreenDashboard } from './screens/Dashboard'
import { ScreenAgente } from './screens/Agente'
import { ScreenInbox } from './screens/Inbox'
import { ScreenCRM } from './screens/CRM'
import { ScreenAgendamento } from './screens/Agendamento'
import { ScreenConexoes } from './screens/Conexoes'
import { SoonModal } from './ui/SoonModal'
import { ToastHost } from './ui/ToastHost'
import { TweaksPanel, ACCENTS, RADII } from './TweaksPanel'
import type { IconName } from './icons'
import type { RouteId, Toast } from './types'

export default function ClinicaFlowApp() {
  const [route, setRoute] = useState<RouteId>('dashboard')
  const [soon, setSoon] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [twOpen, setTwOpen] = useState(false)
  const [accent, setAccent] = useState('blue')
  const [radius, setRadius] = useState('suave')
  const [shadow, setShadow] = useState('sutil')

  const navigate = useCallback((id: RouteId) => {
    setRoute(id)
    const screen = document.getElementById('screen')
    if (screen) screen.scrollTop = 0
  }, [])
  const pushToast = useCallback((msg: string, icon?: IconName) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, msg, icon }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  // apply tweaks to :root
  useEffect(() => {
    const a = ACCENTS.find((x) => x.key === accent)!
    const r = document.documentElement.style
    r.setProperty('--accent', a.accent)
    r.setProperty('--accent-hover', a.hover)
    r.setProperty('--accent-active', a.active)
    r.setProperty('--accent-weak', a.weak)
    r.setProperty('--accent-weak-2', a.weak2)
  }, [accent])
  useEffect(() => {
    const r = document.documentElement.style
    const map = RADII[radius]
    Object.keys(map).forEach((k) => r.setProperty(k, map[k]))
  }, [radius])
  useEffect(() => {
    const r = document.documentElement.style
    if (shadow === 'plana') {
      r.setProperty('--sh-xs', 'none')
      r.setProperty('--sh-sm', 'none')
      r.setProperty('--sh-card', 'none')
    } else {
      r.setProperty('--sh-xs', '0 1px 2px rgba(16,24,40,0.05)')
      r.setProperty('--sh-sm', '0 1px 2px rgba(15,48,106,0.05), 0 2px 6px rgba(45,127,249,0.06)')
      r.setProperty('--sh-card', '0 1px 2px rgba(16,24,40,0.04), 0 6px 16px rgba(15,48,106,0.06)')
    }
  }, [shadow])

  // tweaks host protocol
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = e && e.data && e.data.type
      if (t === '__activate_edit_mode') setTwOpen(true)
      else if (t === '__deactivate_edit_mode') setTwOpen(false)
    }
    window.addEventListener('message', onMsg)
    window.parent.postMessage({ type: '__edit_mode_available' }, '*')
    return () => window.removeEventListener('message', onMsg)
  }, [])
  const closeTweaks = () => {
    setTwOpen(false)
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*')
  }

  const isInbox = route === 'inbox'

  return (
    <div id="app">
      <Sidebar route={route} onNavigate={navigate} onSoon={setSoon} />
      <main id="main">
        <Topbar route={route} />
        <div
          id="screen"
          style={isInbox ? { overflow: 'hidden', background: 'var(--surface)' } : {}}
        >
          {route === 'dashboard' && <ScreenDashboard onNavigate={navigate} />}
          {route === 'agente' && <ScreenAgente onNavigate={navigate} onToast={pushToast} />}
          {route === 'inbox' && <ScreenInbox onToast={pushToast} />}
          {route === 'contatos' && <ScreenCRM onNavigate={navigate} onToast={pushToast} />}
          {route === 'agendamento' && <ScreenAgendamento onToast={pushToast} />}
          {route === 'conexoes' && <ScreenConexoes onToast={pushToast} />}
        </div>
      </main>

      {soon && <SoonModal titulo={soon} onClose={() => setSoon(null)} />}
      <ToastHost toasts={toasts} />
      <TweaksPanel
        open={twOpen}
        onClose={closeTweaks}
        accent={accent}
        setAccent={setAccent}
        radius={radius}
        setRadius={setRadius}
        shadow={shadow}
        setShadow={setShadow}
      />
    </div>
  )
}
