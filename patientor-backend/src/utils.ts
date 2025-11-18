import { Diagnosis, Discharge, Entry, Gender, HealthCheckRating, NewEntry, NewPatient } from './types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

// Type guards
// ===================
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
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

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  const object = Object.values(HealthCheckRating)
    .map(hcr => Number(hcr))
    .includes(param);
  return object;
};

// Parsers
// ===================
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date: must be yyyy-mm-dd');
  }
  return dateOfBirth;
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

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes || !Array.isArray(codes)) {
    throw new Error('Diagnosis codes must be an array');
  }
  codes.forEach(code => {
    if (!isString(code)) {
      throw new Error('Invalid diagnosis code: must be a string');
    }
  });
  return codes as Array<Diagnosis['code']>;
};

const parseHealthCheckingRating = (rating: unknown): HealthCheckRating => {
  if (rating === null || rating === undefined || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Invalid or missing health check rating ' + rating);
  }
  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Invalid or missing discharge: must be an object');
  }
  if (!('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Missing discharge data: date or criteria');
  }
  if (!isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Invalid or missing discharge date: must be a date string');
  }
  if (!isString(discharge.criteria)) {
    throw new Error('Invalid or missing discharge criteria: must be a string');
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria,
  };
};

// Converters
// ===================

// New Patient
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
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntriesType(object.entries),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

// New Entry
export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data: data is not an object');
  }
  if ('type' in object) {
    if (!isString(object.type) || !isEntryType(object.type)) {
      throw new Error(`Invalid or missing entry type: ${object.type}`);
    }
    if ('date' in object && 'specialist' in object && 'description' in object) {
      const date = parseDate(object.date);
      const specialist = parseName(object.specialist);
      const description = parseName(object.description);
      const diagnosisCodes = 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined;
      switch (object.type) {
        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            const newEntry: NewEntry = {
              type: 'HealthCheck',
              date,
              specialist,
              description,
              healthCheckRating: parseHealthCheckingRating(object.healthCheckRating),
              ...(diagnosisCodes && { diagnosisCodes }),
            };
            return newEntry;
          }
          throw new Error('Incorrect data for HealthCheck entry: some fields are missing');
          break;
        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            const newEntry: NewEntry = {
              type: 'OccupationalHealthcare',
              date,
              specialist,
              description,
              employerName: parseName(object.employerName),
              ...(diagnosisCodes && { diagnosisCodes }),
            };
            return newEntry;
          }
          throw new Error('Incorrect data for OccupationalHealthcare entry: some fields are missing');
          break;
        case 'Hospital':
          if ('discharge' in object) {
            const newEntry: NewEntry = {
              type: 'Hospital',
              date,
              specialist,
              description,
              discharge: parseDischarge(object.discharge),
              ...(diagnosisCodes && { diagnosisCodes }),
            };
            return newEntry;
          }
          throw new Error('Incorrect data for Hospital entry: some fields are missing');
          break;
        default:
          return assertNever(object.type);
      }
    }
    throw new Error('Incorrect data: some fields are missing: date, specialist or description');
  }
  throw new Error('Incorrect data: type field is missing');
};
