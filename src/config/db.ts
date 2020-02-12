import { ConnectionOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_LOGGING, DB_DIALECT, DB_MIGRATIONS, DB_ENTITIES, DB_EXTRA } from '../utils/secrets';
type DIALECT = 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'mongodb';

export const dbOptions: ConnectionOptions = {
    type: DB_DIALECT as DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [
        __dirname + '/../../' + DB_ENTITIES
    ],
    migrations: [
        __dirname + '/../../' + DB_MIGRATIONS
    ],
    logging: DB_LOGGING,
    synchronize: false,
    extra: JSON.parse(DB_EXTRA)

    // use below options for createTestingConnections method
    // schemaCreate: true,
    // dropSchema: true,
    // npm run db:sync
};