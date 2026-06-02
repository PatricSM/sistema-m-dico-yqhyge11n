import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import useAppStore from '@/stores/use-app-store'

export default function Atendimento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { patients, addRecord } = useAppStore()

  const patient = patients.find((p) => p.id === id)

  const [soap, setSoap] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  })

  const [prescriptions, setPrescriptions] = useState<{ medication: string; dosage: string }[]>([])
  const [newMed, setNewMed] = useState('')
  const [newDosage, setNewDosage] = useState('')

  if (!patient) return null

  const handleAddMed = () => {
    if (!newMed || !newDosage) return
    setPrescriptions([...prescriptions, { medication: newMed, dosage: newDosage }])
    setNewMed('')
    setNewDosage('')
  }

  const handleRemoveMed = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index))
  }

  const handleFinalize = () => {
    if (!soap.subjective || !soap.assessment) {
      toast({
        title: 'Atenção',
        description: 'Preencha ao menos o relato (Subjetivo) e o diagnóstico (Avaliação).',
        variant: 'destructive',
      })
      return
    }

    addRecord({
      id: `r${Date.now()}`,
      patientId: patient.id,
      date: new Date().toISOString(),
      ...soap,
      prescriptions,
    })

    toast({
      title: 'Atendimento Finalizado',
      description: 'O prontuário foi salvo com sucesso.',
    })
    navigate(`/pacientes/${patient.id}`)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Em Atendimento</h1>
            <p className="text-primary font-medium">{patient.name}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Salvar Rascunho</Button>
          <Button
            onClick={handleFinalize}
            className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
          >
            <Save className="h-4 w-4" /> Finalizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-elevation">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-lg flex items-center gap-2">Evolução (SOAP)</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-sm">
                    S
                  </span>
                  Subjetivo (Anamnese)
                </Label>
                <Textarea
                  placeholder="Relato do paciente, queixas principais..."
                  className="min-h-[100px] resize-y bg-slate-50 focus-visible:bg-white"
                  value={soap.subjective}
                  onChange={(e) => setSoap({ ...soap, subjective: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-sm">
                    O
                  </span>
                  Objetivo (Exame Físico)
                </Label>
                <Textarea
                  placeholder="Sinais vitais, observações clínicas..."
                  className="min-h-[100px] resize-y bg-slate-50 focus-visible:bg-white"
                  value={soap.objective}
                  onChange={(e) => setSoap({ ...soap, objective: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-sm">
                    A
                  </span>
                  Avaliação (Diagnóstico)
                </Label>
                <Textarea
                  placeholder="Hipótese diagnóstica, CID..."
                  className="min-h-[80px] resize-y bg-slate-50 focus-visible:bg-white"
                  value={soap.assessment}
                  onChange={(e) => setSoap({ ...soap, assessment: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-sm">
                    P
                  </span>
                  Plano (Conduta)
                </Label>
                <Textarea
                  placeholder="Tratamento proposto, exames solicitados..."
                  className="min-h-[80px] resize-y bg-slate-50 focus-visible:bg-white"
                  value={soap.plan}
                  onChange={(e) => setSoap({ ...soap, plan: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-elevation sticky top-24">
            <CardHeader className="bg-primary/5 border-b pb-4">
              <CardTitle className="text-lg text-primary">Receituário</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="space-y-2">
                  <Label>Medicamento</Label>
                  <Input
                    placeholder="Ex: Paracetamol 500mg"
                    value={newMed}
                    onChange={(e) => setNewMed(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Posologia</Label>
                  <Input
                    placeholder="Ex: Tomar 1 comp. a cada 8h"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <Button onClick={handleAddMed} className="w-full gap-2 mt-2" variant="secondary">
                  <Plus className="h-4 w-4" /> Adicionar à Receita
                </Button>
              </div>

              {prescriptions.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900">Itens Adicionados:</h4>
                  {prescriptions.map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start p-3 bg-white border shadow-sm rounded-md group"
                    >
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{p.medication}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.dosage}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-destructive"
                        onClick={() => handleRemoveMed(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
