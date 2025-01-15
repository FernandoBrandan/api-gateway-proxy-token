import { Router } from "express";
const router = Router();

import { login, register, validate } from "../controllers/authController";

router.post("/register", register); 
router.post("/login", login);
router.get("/validate", validate);

export default router;
