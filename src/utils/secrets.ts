import dotenv from 'dotenv';
import fs from 'fs';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

function getEnvironment(path: string, env: string) {
    if (fs.existsSync(path)) {
        console.log(`Using ${env} environment variables`);
        dotenv.config({ path });
    } else {
        console.error(`Can't load ${env} ${path} variables`);
        process.exit(1);
    }
}

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
if (ENVIRONMENT === 'production') {
    getEnvironment('.env', ENVIRONMENT);
} else {
    if (ENVIRONMENT === 'test') {
        getEnvironment('.env.test', ENVIRONMENT);
    } else {
        getEnvironment('.env.dev', 'development');
    }
}

/**
 * Database connection
 */
export const DB_DIALECT = process.env.TYPEORM_CONNECTION;
export const DB_NAME = process.env.db || process.env.TYPEORM_DATABASE;
export const DB_HOST = process.env.docker_host || process.env.TYPEORM_HOST;
export const DB_PORT = process.env.docker_port ? Number(process.env.docker_port) : Number(process.env.TYPEORM_PORT);
export const DB_USER = process.env.docker_user || process.env.TYPEORM_USERNAME;
export const DB_PASSWORD = process.env.TYPEORM_PASSWORD;
export const DB_LOGGING = process.env.TYPEORM_LOGGING as LoggerOptions;
export const DB_MIGRATIONS = process.env.TYPEORM_MIGRATIONS ;
export const DB_ENTITIES = process.env.TYPEORM_ENTITIES;
export const DB_EXTRA = process.env.TYPEORM_DRIVER_EXTRA;
console.log('extra', DB_EXTRA);
console.log('db migrations', DB_MIGRATIONS);

/**
 * Winston logger
 */
export const LOGGING_ERROR_PATH = process.env.LOGGING_ERROR_PATH;
export const LOGGING_EXCEPTION_PATH = process.env.LOGGING_EXCEPTION_PATH;
export const LOGGING_LEVEL_CONSOLE = process.env.LOGGING_LEVEL_CONSOLE;
export const LOGGING_LEVEL_FILE = process.env.LOGGING_LEVEL_FILE;

/*
** Redis
*/

export const config = {
    env: ENVIRONMENT,
    db: {
        dialect: process.env.TYPEORM_CONNECTION,
        name: process.env.TYPEORM_DATABASE,
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        user: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        logging: process.env.TYPEORM_LOGGING === 'true',
        migrations: process.env.TYPEORM_MIGRATIONS,
        entities: process.env.TYPEORM_ENTITIES,
        extra: process.env.TYPEORM_DRIVER_EXTRA,
    },
    logging: {
        paths: {
            error: process.env.LOGGING_ERROR_PATH,
            exception: process.env.LOGGING_EXCEPTION_PATH,
        },
        level: {
            console: process.env.LOGGING_LEVEL_CONSOLE,
            file: process.env.LOGGING_LEVEL_FILE,
        }
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
};

/*
** Secret keys
*/

export const secret = process.env.secret;
export const password_key = process.env.password_key;