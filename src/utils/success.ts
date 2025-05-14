import { Request, Response, NextFunction } from 'express';

const successHandler = (_req: Request, res: Response, _next: NextFunction) => {
  res.sendSuccess = (message: string, data: any = {}) => {
    res.status(200).json({
      status: "success",
      message: message,
      data: data,
      error: null
    });
  };
};

export default successHandler