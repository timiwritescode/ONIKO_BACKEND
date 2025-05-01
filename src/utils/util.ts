import jwt from "jsonwebtoken";
import { envSchema } from "../validation/env.validation";
import { JwtPayload } from "../interface/jwtPayload.interface";



export function generateAccessToken(payload: JwtPayload): string {
    const envVars =  envSchema.parse(process.env);
    
    return jwt.sign(payload, envVars.APP_SECRET, {
        expiresIn: '1800s'
    });
}