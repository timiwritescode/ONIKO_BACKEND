import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string({ required_error: "Port number is required"}),
    NODE_ENV: z.enum(['development', "production", "test", "staging"]),
    MONGO_DB_URI: z.string({ required_error: "Db url is required "}),
    APP_SECRET: z.string({ required_error: "App secret is required"}),
    APP_DOMAIN: z.string({required_error: "APP domain required"}),
    MAIL_PASSWORD: z.string({required_error: "MAIL Password required"}),
    ORG_MAIL: z.string({required_error: "Email address requierd"}),
    MAIL_PORT: z.string({required_error: "Mail port required"}),
    MAIL_HOST:z.string({required_error: "Mail host required"})
})

export type EnvConfig = z.infer<typeof envSchema>;