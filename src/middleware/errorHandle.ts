import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] })
}
export default errorHandler


/**
 * 
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const response = {
    status: 'error',
    message: err.message || 'Algo salió mal en el servidor.',
    data: null,
    error: err.stack || null,
  };
  res.status(statusCode).json(response);
};

*/