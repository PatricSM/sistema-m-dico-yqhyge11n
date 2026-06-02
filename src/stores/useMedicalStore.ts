import React, { createContext, useContext, useState } from 'react'
import { Patient, Appointment, mockPatients, mockAppointments } from '@/lib/mock-data'

interface MedicalStore {
  patients: Patient[]
  appointments: Appointment[]
  addPatient: (patient: Patient) => void
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void
}

const MedicalContext = createContext<MedicalStore | undefined>(undefined)

export function MedicalProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)

  const addPatient = (patient: Patient) => {
    setPatients((prev) => [...prev, patient])
  }

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)))
  }

  return React.createElement(
    MedicalContext.Provider,
    { value: { patients, appointments, addPatient, updateAppointmentStatus } },
    children,
  )
}

export default function useMedicalStore() {
  const context = useContext(MedicalContext)
  if (!context) {
    throw new Error('useMedicalStore must be used within a MedicalProvider')
  }
  return context
}
