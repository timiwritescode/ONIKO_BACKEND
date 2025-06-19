import express from "express";
import userController from "./user.controller"

const router = express.Router();


router.use("/user", userController)


export default router;