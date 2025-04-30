import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import api from "../api/index.api"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import notfoundMiddleware from "../middleware/notFound.middleware";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware";
import { corsOptions } from "../config/corsOptions";
import ExpressMongoSanitize from "express-mongo-sanitize"


config();


export const bootstrapExpress = (app: any) => {
    app.use(ExpressMongoSanitize());
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.urlencoded({
    extended: true, limit: "30mb"
    }));
    app.use(cookieParser());

    // routes
    app.use("/api", api)


    // error handlers
    app.use(notfoundMiddleware);
    app.use(errorHandlerMiddleware);
}