import { NewPatient } from './types';

const parseName = (name: unknown): string => {
  return String(name);
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  return String(dateOfBirth);
};
const parseSsn = (ssn: unknown): string => {
  return String(ssn);
};
const parseGender = (gender: unknown): string => {
  return String(gender);
};
const parseOccupation = (occupation: unknown): string => {
  return String(occupation);
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};
