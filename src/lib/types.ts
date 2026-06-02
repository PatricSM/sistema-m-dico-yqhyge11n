export type Patient = {
  id: string
  name: string
  cpf: string
  bloodType: string
  allergies: string[]
  phone: string
  email: string
  lastVisit: string
  image: string
}

export type AppointmentStatus = 'Confirmado' | 'Aguardando' | 'Em Andamento' | 'Cancelado'

export type Appointment = {
  id: string
  patientId: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  type: string
  status: AppointmentStatus
  reason: string
}

export type RecordEntry = {
  id: string
  patientId: string
  date: string
  subjective: string
  objective: string
  assessment: string
  plan: string
  prescriptions: { medication: string; dosage: string }[]
}
