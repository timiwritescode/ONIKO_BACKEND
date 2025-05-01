import { NextFunction, Request, Response } from "express";
import BaseException from "../exceptions/base.exception";
import { logger } from "../config/logger";


const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
    const defaultError = {
        stausCode: err.statusCode || 500,
        msg: err.message || "Something went wrong, try again later"
    };
    
    if (err instanceof BaseException) {

                res
                .status(defaultError.stausCode)
                .json({message: defaultError.msg, success: false})
                return;
    }

    if (err.name === "ValidationError") {
        defaultError.stausCode = 500;
        defaultError.msg = Object.values(err.errors)
                            .map((item: {message: string}) => item?.message)
                            .join(",");

    }


    if (err.name = "CastError") {
        defaultError.stausCode = 400;
        defaultError.msg = "Resource not found. Invalid: " + err.path
    }

    if (err.code && err.code === 11000) {
        defaultError.stausCode = 400;
        defaultError.msg = `${Object.keys(err.KeyValue)} field has to be unique`
    }

    res
        .status(defaultError.stausCode)
        .json({ message: defaultError.msg, succes: false})
    next();
};


export default errorHandlerMiddleware;