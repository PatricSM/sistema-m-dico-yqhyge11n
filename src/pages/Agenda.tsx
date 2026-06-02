import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Clock, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import useAppStore from '@/stores/use-app-store'
import { StatusBadge } from '@/components/StatusBadge'
import { Appointment } from '@/lib/types'

export default function Agenda() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null)
  const { appointments, patients } = useAppStore()

  const selectedDateStr = date ? date.toISOString().split('T')[0] : ''
  const dayAppointments = appointments
    .filter((a) => a.date === selectedDateStr)
    .sort((a, b) => a.time.localeCompare(b.time))

  const hours = Array.from({ length: 11 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`)

  const handleAppClick = (app: Appointment) => {
    setSelectedApp(app)
  }

  const selectedPatient = selectedApp ? patients.find((p) => p.id === selectedApp.patientId) : null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agenda</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus horários e consultas.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Agendar
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="border-none shadow-elevation h-fit lg:w-80 shrink-0 p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
            locale={ptBR}
          />
        </Card>

        <Card className="flex-1 border-none shadow-elevation overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800 capitalize">
                {date ? format(date, "EEEE, d 'de' MMMM", { locale: ptBR }) : 'Selecione uma data'}
              </h2>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {dayAppointments.length} consultas
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {hours.map((hour) => {
                const appsInHour = dayAppointments.filter((a) =>
                  a.time.startsWith(hour.split(':')[0]),
                )

                return (
                  <div key={hour} className="flex group min-h-[80px]">
                    <div className="w-20 shrink-0 p-4 border-r border-slate-100 text-sm font-medium text-muted-foreground flex items-start justify-end pt-5">
                      {hour}
                    </div>
                    <div className="flex-1 p-2 flex flex-col gap-2 relative">
                      {appsInHour.length === 0 && (
                        <div className="absolute inset-2 border-2 border-dashed border-transparent group-hover:border-slate-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                          <span className="text-sm text-muted-foreground font-medium">
                            + Novo agendamento
                          </span>
                        </div>
                      )}
                      {appsInHour.map((app) => {
                        const p = patients.find((pat) => pat.id === app.patientId)
                        return (
                          <div
                            key={app.id}
                            onClick={() => handleAppClick(app)}
                            className="bg-white border shadow-sm hover:shadow-md hover:border-primary/30 rounded-lg p-3 cursor-pointer transition-all animate-fade-in-up z-10"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-slate-800">{p?.name}</span>
                              <StatusBadge
                                status={app.status}
                                className="scale-90 origin-top-right"
                              />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {app.time}
                              </span>
                              <span className="flex items-center gap-1 truncate">
                                <FileText className="h-3 w-3" /> {app.reason}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <SheetContent className="sm:max-w-md w-full p-0 flex flex-col">
          {selectedApp && selectedPatient && (
            <>
              <div className="bg-slate-50 p-6 border-b">
                <SheetHeader className="text-left">
                  <div className="flex justify-between items-start">
                    <StatusBadge status={selectedApp.status} />
                    <span className="text-sm font-medium text-muted-foreground bg-white px-2 py-1 rounded-md border">
                      {selectedApp.date} às {selectedApp.time}
                    </span>
                  </div>
                  <SheetTitle className="text-2xl mt-4">{selectedPatient.name}</SheetTitle>
                  <SheetDescription className="text-base">{selectedApp.type}</SheetDescription>
                </SheetHeader>
              </div>
              <div className="p-6 flex-1 overflow-auto space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                    Motivo
                  </h4>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border">
                    {selectedApp.reason}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground font-medium uppercase">
                      Telefone
                    </span>
                    <p className="text-sm font-medium">{selectedPatient.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground font-medium uppercase">
                      Convênio
                    </span>
                    <p className="text-sm font-medium">Particular</p>
                  </div>
                </div>

                <div className="pt-6 border-t flex flex-col gap-3">
                  <Button className="w-full" asChild>
                    <Link to={`/atendimento/${selectedPatient.id}`}>Iniciar Atendimento</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/pacientes/${selectedPatient.id}`}>Ver Prontuário Completo</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
