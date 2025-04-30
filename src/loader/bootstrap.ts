import { validateEnv } from "../config/env.config"
import { logger } from "../config/logger";
import { connectToDB } from "../config/mongoose";
import { bootstrapExpress } from "./app";

export const bootstrap = async (app) => {
    validateEnv();

    logger.info("Connecting to mongo db")
    await connectToDB();
    logger.info("succeful connection to mongo db")
    bootstrapExpress(app);
    logger.info("Initiation complete")
}