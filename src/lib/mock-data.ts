import { Patient, Appointment, RecordEntry } from './types'

const today = new Date().toISOString().split('T')[0]

export const initialPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Maria Santos Oliveira',
    cpf: '123.456.789-00',
    bloodType: 'O+',
    allergies: ['Penicilina', 'Ibuprofeno'],
    phone: '(11) 98765-4321',
    email: 'maria.santos@email.com',
    lastVisit: '2023-10-15',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
  },
  {
    id: 'p2',
    name: 'Carlos Mendes',
    cpf: '987.654.321-11',
    bloodType: 'A-',
    allergies: [],
    phone: '(11) 91234-5678',
    email: 'carlos.mendes@email.com',
    lastVisit: '2023-11-02',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
  },
  {
    id: 'p3',
    name: 'Ana Júlia Costa',
    cpf: '456.123.789-22',
    bloodType: 'AB+',
    allergies: ['Amendoim'],
    phone: '(11) 99988-7766',
    email: 'ana.costa@email.com',
    lastVisit: today,
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
  },
]

export const initialAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    date: today,
    time: '09:00',
    type: 'Primeira Consulta',
    status: 'Confirmado',
    reason: 'Dores de cabeça frequentes',
  },
  {
    id: 'a2',
    patientId: 'p2',
    date: today,
    time: '10:30',
    type: 'Retorno',
    status: 'Aguardando',
    reason: 'Análise de exames de sangue',
  },
  {
    id: 'a3',
    patientId: 'p3',
    date: today,
    time: '14:00',
    type: 'Exame',
    status: 'Confirmado',
    reason: 'Check-up anual',
  },
  {
    id: 'a4',
    patientId: 'p1',
    date: '2023-12-01',
    time: '09:00',
    type: 'Retorno',
    status: 'Aguardando',
    reason: 'Acompanhamento',
  },
]

export const initialRecords: RecordEntry[] = [
  {
    id: 'r1',
    patientId: 'p1',
    date: '2023-10-15',
    subjective: 'Paciente relata dores de cabeça tensionais ao final do dia.',
    objective: 'PA 120/80, FC 72bpm. Exame neurológico sem alterações.',
    assessment: 'Cefaleia tensional.',
    plan: 'Ajuste de postura no trabalho. Prescrição de relaxante muscular.',
    prescriptions: [
      { medication: 'Ciclobenzaprina 5mg', dosage: '1 comp. via oral 12/12h por 5 dias' },
    ],
  },
]
