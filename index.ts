import { ENV } from "./src/config/env.config";
import express, { Express } from "express";
import { createServer, Server } from "http";
import { logger } from "./src/config/logger";
import { bootstrap } from "./src/loader/bootstrap";
import mongoose from "mongoose";



const exitHandler = (server: Server | null) => {
    if (server) {
        server.close(async () => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};


const unExpectedErrorHandler = (server: Server) => {
    return function(error: Error) {
        logger.error(error);
        exitHandler(server);
    };
};


const startServer =  async () => { 
    
    const app = express();
    
    await bootstrap(app);
    

    const httpServer = createServer(app);
    const port = ENV.PORT
    

    const server: Server = httpServer.listen(port, () => {
        logger.info(`Server started on http://localhost:${port}`);
    });

    process.on('uncaughtException', unExpectedErrorHandler(server));
    process.on('unhandledRejection', unExpectedErrorHandler(server));
    process.on('SIGTERM', () => {
        logger.info('SIGTERM recieved');
        if (server) {
            server.close();
        }
    });

    mongoose.connection.on("error", (err) => {
        console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
    })
}

startServer(); 