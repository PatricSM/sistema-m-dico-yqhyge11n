import { Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockActivities } from '@/lib/mock-data'

export function RecentActivityFeed() {
  return (
    <Card className="col-span-1 border-slate-200/60 shadow-sm h-full">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-lg font-semibold">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-6">
          {mockActivities.map((activity, index) => (
            <div key={activity.id} className="relative flex gap-4">
              {/* Timeline line */}
              {index !== mockActivities.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-border" />
              )}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-primary">
                <Activity className="h-3 w-3" />
              </div>
              <div className="flex flex-col gap-1 pb-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <span className="text-xs text-muted-foreground/70">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
