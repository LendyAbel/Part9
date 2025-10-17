import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, Patient, PatientNoSsn } from '../types';

const getPatientes = (): Patient[] => {
  return patients;
};

const getPatientesNoSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPattient = { id, ...patient };
  patients.push(newPattient);
  return newPattient;
};

export default { getPatientes, getPatientesNoSsn, addPatient };
