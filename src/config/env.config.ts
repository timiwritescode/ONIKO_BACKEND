import dotenv from "dotenv";
import { EnvConfig, envSchema } from "../validation/env.validation";
import { z, ZodError } from 'zod';

dotenv.config();


// const envSchema 

export const validateEnv = () => {
    try {
        const envVars: EnvConfig = envSchema.parse(process.env);
        // return {
        //     port: +envVars.PORT,
        //     env: envVars.NODE_ENV,
        //     MONGO_DB_URI: envVars.MONGO_DB_URI
        // };
        return envVars;
    } catch(error) {
        let message;
        if (error instanceof ZodError) {
            message = error.errors;  
            console.error("Validation Failed: ", error.errors)
            throw error
        } else {
            console.error("Error parsing environment variables: ", error)
        }
    }
}


type Env = z.infer<typeof envSchema>

export const ENV: Env = validateEnv()