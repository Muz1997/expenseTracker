import { Router } from "express";

import * as dotenv from "dotenv";
import * as AuthController from "../controller/AuthController.js";
dotenv.config();

const saltRounds = 10;
const router = Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

export default router;
