import { Outlet, Link, useLocation } from 'react-router-dom'
import { Activity, Calendar, Users, Clipboard, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Header } from './Header'
import { cn } from '@/lib/utils'

export default function Layout() {
  const location = useLocation()

  const navItems = [
    { title: 'Início', icon: Activity, path: '/' },
    { title: 'Agenda', icon: Calendar, path: '/agenda' },
    { title: 'Pacientes', icon: Users, path: '/pacientes' },
    { title: 'Prontuários', icon: Clipboard, path: '/prontuarios' },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <Sidebar variant="sidebar" className="border-r shadow-sm">
          <SidebarHeader className="h-16 flex items-center px-6 border-b">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-primary transition-opacity hover:opacity-90"
            >
              <Activity className="h-6 w-6" />
              <span className="text-xl tracking-tight">MediSys</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        'mb-1 h-10 transition-all rounded-lg',
                        isActive
                          ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                          : 'hover:bg-primary/10 hover:text-primary',
                      )}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

            <div className="mt-auto pt-8">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Link to="/configuracoes">
                      <Settings className="h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col flex-1 min-w-0 bg-transparent animate-fade-in">
          <Header />
          <main className="flex-1 overflow-auto p-4 md:p-8">
            <div className="mx-auto max-w-6xl animate-slide-up">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
