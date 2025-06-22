import { z } from "zod";

export const ResetPasswordSchema = z.object({
    email: z.string({required_error: "Email is required"})
        .email("Invalid email")
        .min(1, "Email cannot be empty"),
    
    token: z.number({required_error: "Reset token is required"}),

    new_password: z.string({required_error: "Password field required"})
        .min(8, "Password must be atleast 8 characters")
})


export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>