import { Response } from "express";

// Extiende el tipo `Response` para agregar la función `sendSuccess`
declare global {
  namespace Express {
    interface Response {
      sendSuccess: (data: any) => void;
    }
  }
}
