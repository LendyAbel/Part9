import patientsServices from '../services/patientesServices';
import express, { Request, Response } from 'express';
import { NewPatient, Patient, PatientNoSsn } from '../types';
import { errorMiddleware, newPatientParse } from '../middlewares/patientsMiddlewares';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNoSsn[]>) => {
  res.send(patientsServices.getPatientesNoSsn());
});

router.post('/', newPatientParse, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = patientsServices.addPatient(req.body);
  res.json(newPatient);
});

router.use(errorMiddleware);

export default router;
