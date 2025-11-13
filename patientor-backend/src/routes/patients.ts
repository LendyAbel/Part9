import patientsServices from '../services/patientesServices';
import express, { Response, Request } from 'express';
import { Entry, NewPatient, Patient } from '../types';
import { toNewEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientsServices.getPatientes());
});

router.get('/:id', (req: Request, res: Response<Patient | { error: string }>) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ error: 'Missing id parameter' });
  }
  const patient = patientsServices.getPatientById(id);

  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }

  return res.send(patient);
});

router.post('/', (req: Request, res: Response<NewPatient | { error: string }>) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientsServices.addPatient(newPatientEntry);
    return res.send(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entries', (req: Request, res: Response<Entry | { error: string }>) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ error: 'Missing id parameter' });
  }
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsServices.addEntry(id, newEntry);
    return res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

export default router;
