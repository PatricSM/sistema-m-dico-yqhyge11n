import { Badge } from '@/components/ui/badge'
import { AppointmentStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

export function StatusBadge({
  status,
  className,
}: {
  status: AppointmentStatus
  className?: string
}) {
  const variants: Record<AppointmentStatus, { className: string }> = {
    Confirmado: {
      className: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200',
    },
    Aguardando: { className: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200' },
    'Em Andamento': { className: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200' },
    Cancelado: { className: 'bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200' },
  }

  return (
    <Badge variant="outline" className={cn('font-medium', variants[status].className, className)}>
      {status}
    </Badge>
  )
}
