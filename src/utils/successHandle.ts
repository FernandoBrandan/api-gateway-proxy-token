import { Response, NextFunction } from "express";

// Middleware para manejar respuestas exitosas
const successHandler = (res: Response, next: NextFunction) => {
  // Agregar la función `sendSuccess` en la respuesta
  res.sendSuccess = (data: any) => {
    res.status(200).json({
      success: true,
      data: data || null, // Si no hay datos, se envía `null`
    });
  };

  // Continuar con el siguiente middleware o controlador
  next();
};

export default successHandler;
