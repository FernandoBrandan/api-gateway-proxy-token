import { Application, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function ensureAuth(req: Request, __res: Response, next: NextFunction): void {
  try {
    if (!req.headers.authorization) {
      throw new Error("No headers.authorization provided")
    }
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token || token === "null") {
      throw new Error("No token provided")
    }
    jwt.verify(token as string, process.env.JWT_TOKEN_SECRET as string);
    next();
  } catch (error) {
    next(error)
  }
}

const setupAuth = (app: Application, routes: any[]) => {
  routes.forEach((route) => {
    if (route.auth) {
      app.use(route.url, ensureAuth, (__req: Request, __res: Response, next: NextFunction) => {
        next();
      });
    }
  });
};

export default setupAuth;
