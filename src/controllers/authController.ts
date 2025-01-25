import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { registerValidateHandler, loginValidateHandler } from "../utils/userValidate";
import { passwordEncrypt, passwordDecrypt } from "../utils/passwordEncryption";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const validated = registerValidateHandler(req.body);
    if (!validated) {
      throw new Error("Error al validar los datos");
    }
    const emailDuplicate = await User.findOne({ email: req.body.email });
    if (emailDuplicate) {
      throw new Error("El email ya existe");
    }

    const passwordEncripted = await passwordEncrypt(req.body.password);
    if (!passwordEncripted) {
      throw new Error("Error al encriptar la contraseña");
    }

    req.body.password = passwordEncripted;
    const userCreated = await User.create(req.body);
    if (!userCreated) {
      throw new Error("Error al crear el usuario");
    }

    return res.status(201).json({ success: "Usuario creado correctamente", userCreated });
  } catch (err) {
    return res.status(500).json({
      error: "Error endpoint register",
      message: (err as Error).message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const validated = loginValidateHandler(req.body);
    if (!validated) { throw new Error("Error al validar los datos"); }

    const user = await User.findOne({ email: req.body.email });
    if (!user) { throw new Error("El usuario no existe"); }

    const validPass = await passwordDecrypt(req.body.password as string, user.password as string);
    if (!validPass) { throw new Error("La contraseña es incorrecta"); }

    const tokenSecret = process.env.JWT_TOKEN_SECRET as string;
    const token = jwt.sign(
      {
        name: user.name,
        surname: user.surname,
        email: user.email
      },
      tokenSecret);

    return res.status(200).json({ success: "Usuario logueado correctamente", token });
  } catch (err) {
    return res.status(500).json({
      error: "Error endpoint login",
      message: (err as Error).message,
    });
  }
};

export const validate = async (req: Request, res: Response): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) { throw new Error("No se ha enviado el token"); }

    const validToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string);
    if (!validToken) { throw new Error("El token no es válido"); }

    // Obtener usuario y retornarlo si es necesario
    // Ejemplo: const user = await User.findById(validToken.id);
    return res.status(200).json({ success: "Usuario validado correctamente" });
  } catch (err) {
    return res.status(500).json({
      err: "Error endpoint login",
      message: (err as Error).message,
    });
  }
};
