import { z } from 'zod';
import { NewPatientSchema } from './utils';

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Femele = 'female',
  Other = 'other',
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}

export type PatientNoSsn = Omit<Patient, 'ssn'>;
