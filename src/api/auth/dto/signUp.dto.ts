import { z } from "zod";


export const SignUpSchema = z.object({
    username: z.string({required_error: "Name is required"}).min(1, "Name cannot be empty"),
    email: z.string({required_error: "Email is required"}).email("Invalid email address"),
    password: z.string().min(8, "Password must have at least 8 characters")
})



export type SignUpDto = z.infer<typeof SignUpSchema>;