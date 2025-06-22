import { config } from "dotenv";
import express, {Express, Request, Response} from "express";

import helmet from "helmet";
import cors from "cors";
import api from "../api/index.api"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import notfoundMiddleware from "../middleware/notFound.middleware";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware";
import { corsOptions } from "../config/corsOptions";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger.config"
import { ENV } from "../config/env.config";
import "../api/auth/events/forgotPassword.event"

config();


export const bootstrapExpress = (app: Express) => {
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.urlencoded({
    extended: true, limit: "30mb"
    }));
    app.use(cookieParser());
      
    
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.status(200).send("Server healthy!")
    })

    // routes
    app.use("/api/v1", api)


    // init swagger 
    if (ENV.NODE_ENV == "development" || ENV.NODE_ENV == "staging") {
            app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    }

    // error handlers
    app.use(notfoundMiddleware);
    app.use(errorHandlerMiddleware);

    return app;
}
