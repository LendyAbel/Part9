import diagnosisServices from '../services/diagnosisServices';
import express, { Response } from 'express';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisServices.getDiagnoses());
});

export default router;
