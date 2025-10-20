import { NextFunction, Request, Response } from 'express';
import { NewPatientSchema } from '../utils';
import { z } from 'zod';

export const newPatientParse = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    const path = error.issues[0]?.path;
    const message = error.issues[0]?.message;
    const errorMessage = `Something went wrong. Error: ${message} Location: ${path}`;
    res.status(400).send(errorMessage);
  } else {
    next(error);
  }
};
