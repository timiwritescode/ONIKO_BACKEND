import { z } from "zod";

export const ForgotPasswordSchema = z.object({
    email: z.string({required_error: "Email is required"})
        .email("Invalid email")
        .min(1, "Email cannot be empty")
});


export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>