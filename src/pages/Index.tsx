import { Link } from 'react-router-dom'
import { Calendar, Users, ClipboardList, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useAppStore from '@/stores/use-app-store'
import { StatusBadge } from '@/components/StatusBadge'

export default function Index() {
  const { appointments, patients } = useAppStore()
  const today = new Date().toISOString().split('T')[0]

  const todayAppointments = appointments
    .filter((a) => a.date === today)
    .sort((a, b) => a.time.localeCompare(b.time))
  const upcomingAppointments = todayAppointments.slice(0, 5)

  const stats = [
    {
      title: 'Consultas Hoje',
      value: todayAppointments.length.toString(),
      icon: Calendar,
      color: 'text-primary',
    },
    { title: 'Novos Pacientes (Mês)', value: '12', icon: Users, color: 'text-emerald-500' },
    { title: 'Prontuários Pendentes', value: '3', icon: ClipboardList, color: 'text-amber-500' },
    { title: 'Faturamento Estimado', value: 'R$ 4.250', icon: TrendingUp, color: 'text-blue-500' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bom dia, Dr. Roberto</h1>
          <p className="text-muted-foreground mt-1">Aqui está o resumo do seu dia.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button asChild variant="outline" className="bg-white">
            <Link to="/pacientes">
              <Plus className="mr-2 h-4 w-4" /> Novo Paciente
            </Link>
          </Button>
          <Button asChild>
            <Link to="/agenda">
              <Plus className="mr-2 h-4 w-4" /> Nova Consulta
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-elevation hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 lg:col-span-5 border-none shadow-elevation">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Próximas Consultas
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary hover:text-primary/80"
            >
              <Link to="/agenda">
                Ver agenda completa <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {upcomingAppointments.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhuma consulta agendada para hoje.
                </div>
              ) : (
                upcomingAppointments.map((app) => {
                  const patient = patients.find((p) => p.id === app.patientId)
                  if (!patient) return null
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center w-14 h-14 bg-primary/5 rounded-xl text-primary border border-primary/10">
                          <span className="text-lg font-bold leading-none">
                            {app.time.split(':')[0]}
                          </span>
                          <span className="text-xs font-medium">{app.time.split(':')[1]}</span>
                        </div>
                        <div>
                          <Link
                            to={`/pacientes/${patient.id}`}
                            className="font-semibold text-slate-800 hover:text-primary transition-colors"
                          >
                            {patient.name}
                          </Link>
                          <div className="text-sm text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span>{app.type}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className="truncate max-w-[200px]">{app.reason}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={app.status} className="hidden sm:inline-flex" />
                        <Button
                          asChild
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Link to={`/pacientes/${patient.id}`}>Ficha</Link>
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 lg:col-span-2 border-none shadow-elevation bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start relative before:absolute before:left-[19px] before:top-10 before:bottom-[-24px] before:w-[2px] before:bg-slate-200 last:before:hidden"
                >
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm shrink-0">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <ClipboardList className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col pt-1">
                    <span className="text-sm font-medium text-slate-800">
                      Prontuário atualizado
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      Ana Júlia Costa • Há 2 horas
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
