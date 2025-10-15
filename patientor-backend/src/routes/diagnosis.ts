import express, { Response } from 'express';
import diagnosisServices from '../services/diagnosisServices';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>)=>{
    res.send(diagnosisServices.getDiagnoses());
});

export default router;