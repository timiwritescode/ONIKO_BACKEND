import express, { NextFunction, Request, Response } from "express";
import { validate } from "../../../validation/validate";
import { SignUpSchema } from "../dto/signUp.dto";
import { signInUser, signUpUser } from "../service/auth.service";
import { SignInSchema } from "../dto/signIn.dto";

const router = express.Router();



/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 1a2b3c4d5e
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Bad Request (Validation Error)
 */
router.post("/sign-up", validate(SignUpSchema), async (req: Request, res: Response) => {
        const response = await signUpUser(req.body)
        res
        .status(201)
        .json(response)
})


/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *                 message:
 *                   type: string
 *                   example: Sign in successful
 *       400:
 *         description: Invalid credentials or missing fields
 */
router.post("/sign-in", validate(SignInSchema), async (req: Request, res: Response) => {
  const response = await signInUser(req.body);
  res.status(200).json(response);
});

router.post("/forgot-password", async (req: Request, res: Response) => {})

router.post("/reset-password", async (req: Request, res: Response) => {})

export default router;

