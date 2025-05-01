import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";
import BadRequestEsxception from "../exceptions/badRequest.exception";


export const validate = (schema: ZodSchema<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        
        if (!result.success) {
            const zodError = result.error;
            // console.log(zodError.errors)
            const messages = zodError.errors.map(err => `${err.path.join(".")}: ${err.message}`);

            // console.log(messages)
            throw new BadRequestEsxception(messages.join(", "));
        }

        req.body = result.data;
        next();
    }