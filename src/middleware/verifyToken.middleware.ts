import { NextFunction, Request, Response } from "express";
import UnauthorizedException from "../exceptions/unauthorized.exception";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config";


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        throw new UnauthorizedException("Token is required")
    }
    
    jwt.verify(token, ENV.APP_SECRET, (err, decoded) => {
        if (err) {
            throw new UnauthorizedException("Invalid token");
        };
        
        req["user"] = decoded;
        next();
    })
    
}