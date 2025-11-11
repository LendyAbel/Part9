import patientsServices from '../services/patientesServices';
import express, { Response } from 'express';
import { Patient } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientsServices.getPatientes());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsServices.getPatientById(id);

  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }

  return res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientsServices.addPatient(newPatientEntry);
    res.send(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      res.status(400).send(errorMessage);
    }
  }
});

export default router;
