import { z } from "zod";


export const SignInSchema = z.object({
    email: z.string({required_error: "Email is required"})
                .email("Invalid email address")
                .min(1, "Email cannot be empty"),
    password: z.string().min(1, "Password cannot be empty")
})



export type SignInDto = z.infer<typeof SignInSchema>;