import { Application, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.sendStatus(401);
    }
    jwt.verify(token as string, process.env.JWT_TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(400).json({ error: "invalid token" });
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
