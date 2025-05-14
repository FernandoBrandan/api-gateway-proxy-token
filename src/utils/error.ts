import { Request, Response, NextFunction } from 'express';

const sendError = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Internal Server Error",
        data: null,
        error: err.stack || null
    });
};

export default sendError