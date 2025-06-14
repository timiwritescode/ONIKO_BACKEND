import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string({ required_error: "Port number is required"}),
    NODE_ENV: z.enum(['development', "production", "test", "staging"]),
    MONGO_DB_URI: z.string({ required_error: "Db url is required "}),
    APP_SECRET: z.string({ required_error: "App secret is required"})
})

export type EnvConfig = z.infer<typeof envSchema>;