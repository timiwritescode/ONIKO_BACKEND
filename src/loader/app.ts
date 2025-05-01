import { config } from "dotenv";
import express, {Express} from "express";

import helmet from "helmet";
import cors from "cors";
import api from "../api/index.api"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import notfoundMiddleware from "../middleware/notFound.middleware";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware";
import { corsOptions } from "../config/corsOptions";
import { bootstrap } from "./bootstrap";


config();


export const bootstrapExpress = (app) => {
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

    return app;
}
