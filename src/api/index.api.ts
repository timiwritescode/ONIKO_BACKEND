import express, { Request, Response } from "express";

import authRouter from "./auth/index";
import userRouter from "./user/index"

const router = express.Router()


router.use(authRouter)
router.use(userRouter)

export default router;

