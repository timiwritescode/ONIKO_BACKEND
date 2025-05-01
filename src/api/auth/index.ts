import express, { Request, Response } from "express";
import authController from "./controllers/auth.controller";


const router = express.Router();

router.use("/auth", authController);

export default router; 