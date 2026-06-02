import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Stethoscope, Phone, Mail, Activity, FileText, Pill } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAppStore from '@/stores/use-app-store'

export default function PacienteDetalhes() {
  const { id } = useParams<{ id: string }>()
  const { patients, records } = useAppStore()
  const patient = patients.find((p) => p.id === id)

  if (!patient) {
    return <div className="p-8 text-center">Paciente não encontrado.</div>
  }

  const patientRecords = records
    .filter((r) => r.patientId === patient.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/pacientes">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Ficha Clínica</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-elevation lg:col-span-1 h-fit">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <Avatar className="h-24 w-24 border-4 border-white shadow-sm mb-4">
                <AvatarImage src={patient.image} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {patient.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">ID: {patient.cpf}</p>
            </div>

            <div className="py-6 space-y-4 border-b border-slate-100">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-slate-500" />
                </div>
                <span className="font-medium">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <span className="font-medium truncate">{patient.email}</span>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tipo Sanguíneo
                </span>
                <div className="mt-2">
                  <Badge
                    variant="outline"
                    className="text-base font-bold px-3 py-1 bg-rose-50 text-rose-700 border-rose-200"
                  >
                    {patient.bloodType}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Alergias
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {patient.allergies.length > 0 ? (
                    patient.allergies.map((a) => (
                      <Badge
                        key={a}
                        variant="destructive"
                        className="bg-destructive/10 text-destructive border-transparent hover:bg-destructive/20"
                      >
                        {a}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">Nenhuma registrada</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Button className="w-full gap-2 shadow-sm" size="lg" asChild>
                <Link to={`/atendimento/${patient.id}`}>
                  <Stethoscope className="h-5 w-5" />
                  Iniciar Atendimento
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="historico" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-white border border-slate-200 rounded-xl p-1 mb-6 shadow-sm">
              <TabsTrigger
                value="historico"
                className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:shadow-none"
              >
                <Activity className="h-4 w-4 mr-2" /> Histórico
              </TabsTrigger>
              <TabsTrigger
                value="exames"
                className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:shadow-none"
              >
                <FileText className="h-4 w-4 mr-2" /> Exames
              </TabsTrigger>
              <TabsTrigger
                value="prescricoes"
                className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:shadow-none"
              >
                <Pill className="h-4 w-4 mr-2" /> Prescrições
              </TabsTrigger>
            </TabsList>

            <TabsContent value="historico" className="space-y-4 m-0 focus-visible:outline-none">
              {patientRecords.length === 0 ? (
                <Card className="border-dashed border-2 bg-slate-50">
                  <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                    <Activity className="h-8 w-8 mb-2 opacity-50" />
                    <p>Nenhum prontuário registrado.</p>
                  </CardContent>
                </Card>
              ) : (
                patientRecords.map((record) => (
                  <Card key={record.id} className="border-none shadow-elevation overflow-hidden">
                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                      <span className="font-semibold text-slate-800">
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </span>
                      <Badge variant="outline" className="bg-white">
                        Consulta Presencial
                      </Badge>
                    </div>
                    <CardContent className="p-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                            S
                          </span>
                          Subjetivo
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {record.subjective}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                            O
                          </span>
                          Objetivo
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{record.objective}</p>
                      </div>
                      <div className="md:col-span-2 border-t border-slate-100 pt-4">
                        <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                            A
                          </span>
                          Avaliação e Plano
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          <span className="font-medium">Diag:</span> {record.assessment}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed mt-1">
                          <span className="font-medium">Plano:</span> {record.plan}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="exames" className="m-0 focus-visible:outline-none">
              <Card className="border-dashed border-2 bg-slate-50">
                <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                  <FileText className="h-8 w-8 mb-2 opacity-50" />
                  <p>Módulo de exames em desenvolvimento.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescricoes" className="m-0 focus-visible:outline-none">
              <Card className="border-none shadow-elevation p-6">
                {patientRecords.flatMap((r) => r.prescriptions).length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    Nenhuma prescrição ativa.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientRecords
                      .flatMap((r) => r.prescriptions)
                      .map((p, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-4 border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Pill className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{p.medication}</p>
                              <p className="text-sm text-muted-foreground">{p.dosage}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Imprimir
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
