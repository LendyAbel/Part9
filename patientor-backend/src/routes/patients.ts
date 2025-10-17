import patientsServices from '../services/patientesServices';
import express, { Response } from 'express';
import { PatientNoSsn } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSsn[]>) => {
  res.send(patientsServices.getPatientesNoSsn());
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
