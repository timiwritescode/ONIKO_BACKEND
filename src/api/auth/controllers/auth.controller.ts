import express, { NextFunction, Request, Response } from "express";
import { validate } from "../../../validation/validate";
import { SignUpSchema } from "../dto/signUp.dto";
import { forgotPassword, resetPassword, signInUser, signUpUser } from "../service/auth.service";
import { SignInSchema } from "../dto/signIn.dto";
import { ForgotPasswordSchema } from "../dto/forgotPassword.dto";
import { ResetPasswordSchema } from "../dto/reset-password.dto";

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
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
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


/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset link to the user's email address.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: The email address associated with the user account.
 *     responses:
 *       200:
 *         description: Password reset link sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP sent to your mail.
 *       400:
 *         description: Validation error (e.g., invalid or missing email).
 *       404:
 *         description: User with the provided email was not found.
 */
router.post("/forgot-password", validate(ForgotPasswordSchema),async (req: Request, res: Response) => {
  const response =  await forgotPassword(req.body);
  res.status(201).json(response);
})


/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset a user's password
 *     description: Verifies a reset token and allows the user to reset their password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *               - new_password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Email address used to request password reset
 *               token:
 *                 type: integer
 *                 example: 123456
 *                 description: 6-digit numeric reset token sent to the user's email
 *               new_password:
 *                 type: string
 *                 example: newPassword123
 *                 description: New user password
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password reset successful
 *       400:
 *         description: Validation error or invalid token
 *       404:
 *         description: User not found
 */

router.post("/reset-password", validate(ResetPasswordSchema), async (req: Request, res: Response) => {
  const response = await resetPassword(req.body)
  res.status(201).json(response);
})

export default router;

