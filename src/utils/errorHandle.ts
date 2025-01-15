import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (err, __req: Request, res: Response, __next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
