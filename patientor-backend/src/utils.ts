import { Gender } from './types';
import { z } from 'zod';

const requiredString = z.string().trim().min(1, { error: 'Missing field' });

export const NewPatientSchema = z.object({
  name: requiredString,
  ssn: requiredString,
  dateOfBirth: requiredString.pipe(z.iso.date()),
  occupation: requiredString,
  gender: z.enum(Gender),
});
