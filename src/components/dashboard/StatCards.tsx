import { Users, ClipboardList, Calendar, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  { title: 'Consultas Hoje', value: '12', description: '3 confirmadas', icon: Calendar },
  {
    title: 'Novos Pacientes',
    value: '24',
    description: '+12% em relação ao mês anterior',
    icon: Users,
  },
  {
    title: 'Prontuários Pendentes',
    value: '5',
    description: 'Requerem finalização',
    icon: ClipboardList,
  },
  { title: 'Faturamento Estimado', value: 'R$ 8.450', description: 'Neste mês', icon: DollarSign },
]

export function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-slate-200/60 shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-primary opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
