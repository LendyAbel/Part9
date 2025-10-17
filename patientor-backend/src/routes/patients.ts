import patientsServices from '../services/patientesServices';
import express, { Response } from 'express';
import { PatientNoSsn } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSsn[]>) => {
  res.send(patientsServices.getPatientesNoSsn());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const newPatient = patientsServices.addPatient(newPatientEntry);
  res.send(newPatient);
});

export default router;
