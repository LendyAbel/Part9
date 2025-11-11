import { Entry, Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isGender = (param: string): param is Gender => {
  const object = Object.values(Gender)
    .map(g => g.toString())
    .includes(param);
  return object;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isEntryType = (param: string): param is Entry['type'] => {
  return ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
const parseEntriesType = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Entries must be an array');
  }
  entries.forEach((entry: unknown) => {
    if (!entry || typeof entry !== 'object') {
      throw new Error('Envalid entry object');
    }

    if (!('type' in entry)) {
      throw new Error('Missing entry type');
    }

    if (!isString(entry.type) || !isEntryType(entry.type)) {
      throw new Error(`Invalid or missing entry type: ${entry.type}`);
    }
  });

  return entries as Entry[];
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntriesType(object.entries),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};
