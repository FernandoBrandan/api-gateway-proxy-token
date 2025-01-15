import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { registerValidateHandler, loginValidateHandler } from "../utils/userValidate";
import { passwordEncrypt, passwordDecrypt } from "../utils/passwordEncryption";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const validated = registerValidateHandler(req.body);
    if (!validated) {
      return res.status(400).json({ error: "Error al validar los datos" });
    }
    const emailDuplicate = await User.findOne({ email: req.body.email });
    if (emailDuplicate) {
      return res.status(400).json({ error: "El email ya existe" });
    }

    const passwordEncripted = await passwordEncrypt(req.body.password);
    if (!passwordEncripted) {
      return res.status(500).json({ error: "Error al encriptar la contraseña" });
    }

    req.body.password = passwordEncripted;
    const userCreated = await User.create(req.body);
    return res.status(201).json({ success: "Usuario creado correctamente", userCreated });
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const validated = loginValidateHandler(req.body);
    if (!validated) {
      return res.status(400).json({ error: "Error al validar los datos" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    const validPass = await passwordDecrypt(req.body.password as string, user.password as string);
    if (!validPass) {
      return res.status(400).json({ error: "La contraseña es incorrecta" });
    }

    const token = jwt.sign({ name: user.name, surname: user.surname, email: user.email }, process.env.JWT_TOKEN_SECRET as string, { expiresIn: "1h" });
    return res.status(200).json({ success: "Usuario logueado correctamente", token });
  } catch (error) {
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export const validate = async (req: Request, res: Response): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No se ha enviado el token" });
    }

    const validToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string);
    if (!validToken) {
      return res.status(401).json({ error: "El token no es válido" });
    }

    // Aquí podrías obtener al usuario y retornarlo si es necesario
    // Ejemplo: const user = await User.findById(validToken.id);

    return res.status(200).json({ success: "Usuario validado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al validar el usuario" });
  }
};
