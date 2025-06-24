import { z } from "zod";

export const EmailVerificationSchema = z.object({
    email: z.string({required_error: "Email is required"})
    .email("Invalid email string")
    .min(1, "email field cannot be empty"),

    token: z.number({required_error: "Reset token is required"}),

})


export type EmailVerificationDto = z.infer<typeof EmailVerificationSchema>