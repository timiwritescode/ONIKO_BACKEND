import express, { NextFunction, Request, Response } from "express";
import { validate } from "../../../validation/validate";
import { SignUpSchema } from "../dto/signUp.dto";
import { signInUser, signUpUser } from "../service/auth.service";
import { SignInSchema } from "../dto/signIn.dto";

const router = express.Router();



router.post("/sign-up", validate(SignUpSchema), async (req: Request, res: Response) => {
        const response = await signUpUser(req.body)
        res
        .status(201)
        .json(response)
})


router.post("/sign-in", validate(SignInSchema), async (req: Request, res: Response) => {
    const response = await signInUser(req.body);
    res
      .status(200)
      .json(response);
})


export default router;

