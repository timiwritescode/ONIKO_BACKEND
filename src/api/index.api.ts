import express from "express";

import authRouter from "./auth/index";


const router = express.Router()

router.use(authRouter)

export default router;

