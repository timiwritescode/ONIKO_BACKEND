import { NextFunction, Request, Response } from "express";


const notfoundMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction): void => {
        res.status(404);
        const error = new Error("not found");
        next(error);
    }

 
export default notfoundMiddleware 