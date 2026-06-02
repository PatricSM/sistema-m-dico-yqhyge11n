import { useState, useEffect } from 'react'
import { Patient, Appointment, RecordEntry } from '@/lib/types'
import { initialPatients, initialAppointments, initialRecords } from '@/lib/mock-data'

type AppState = {
  patients: Patient[]
  appointments: Appointment[]
  records: RecordEntry[]
}

let globalState: AppState = {
  patients: initialPatients,
  appointments: initialAppointments,
  records: initialRecords,
}

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export default function useAppStore() {
  const [state, setState] = useState(globalState)

  useEffect(() => {
    const listener = () => setState(globalState)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return {
    ...state,
    addPatient: (patient: Patient) => {
      globalState = { ...globalState, patients: [...globalState.patients, patient] }
      notify()
    },
    addAppointment: (appointment: Appointment) => {
      globalState = { ...globalState, appointments: [...globalState.appointments, appointment] }
      notify()
    },
    updateAppointmentStatus: (id: string, status: Appointment['status']) => {
      globalState = {
        ...globalState,
        appointments: globalState.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
      }
      notify()
    },
    addRecord: (record: RecordEntry) => {
      globalState = { ...globalState, records: [...globalState.records, record] }
      notify()
    },
  }
}
