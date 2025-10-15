import patientsServices from '../services/patientesServices';
import express, { Response } from 'express';
import { PatientNoSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSsn[]>) => {
  res.send(patientsServices.getPatientesNoSsn());
});

export default router;
