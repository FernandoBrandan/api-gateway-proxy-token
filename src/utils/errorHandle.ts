import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode || 500).json({  
    error: error.message || "Server Error"
  });
};
export default errorHandler;
