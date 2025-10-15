import patients from '../../data/patients';
import { Patient, PatientNoSsn } from '../types';

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

export default { getPatientes, getPatientesNoSsn };
