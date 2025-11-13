import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import type { NewEntry, NewPatient, Patient, PatientNoSsn } from '../types';

const getPatientes = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getPatientesNoSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPattient = { id, ...patient };
  patients.push(newPattient);
  return newPattient;
};

const addEntry = (id: string, entry: NewEntry )=>{
  const patient = patients.find(p=>p.id===id);
  if(!patient){
    throw new Error('Patient not found');
  }
  const newEntry = {id: uuid(), ...entry};
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatientes, getPatientById, getPatientesNoSsn, addPatient, addEntry };
