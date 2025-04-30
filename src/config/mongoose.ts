import { connect, set } from 'mongoose';
import { validateEnv } from './env.config';
import { logger } from './logger';


const MONGO_DB_URI = validateEnv().MONGO_DB_URI;


export const connectToDB = async () => {
    try {
        set('strictQuery', false);
        const db =  await connect(MONGO_DB_URI);
    } catch (error) {
        logger.error(error.stack);
        throw error
    }
}