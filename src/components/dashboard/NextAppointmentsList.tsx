import { Link } from 'react-router-dom'
import { Clock, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useMedicalStore from '@/stores/useMedicalStore'

export function NextAppointmentsList() {
  const { appointments } = useMedicalStore()
  const todayAppointments = appointments.slice(0, 5) // Mock logic

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'default'
      case 'Aguardando':
        return 'secondary'
      case 'Em Andamento':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <Card className="col-span-1 border-slate-200/60 shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
        <CardTitle className="text-lg font-semibold">Próximas Consultas</CardTitle>
        <Button variant="link" size="sm" asChild className="px-0">
          <Link to="/agenda">Ver Agenda</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col divide-y">
          {todayAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-md px-2 py-1 min-w-[60px]">
                  <Clock className="h-3 w-3 mb-1" />
                  <span className="text-sm font-semibold">{apt.time}</span>
                </div>
                <div>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <User className="h-3 w-3 text-muted-foreground" />
                    {apt.patientName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{apt.reason}</p>
                </div>
              </div>
              <Badge variant={getBadgeVariant(apt.status)} className="ml-2 whitespace-nowrap">
                {apt.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
