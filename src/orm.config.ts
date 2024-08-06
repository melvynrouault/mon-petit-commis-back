import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

let config: TypeOrmModuleOptions;

if (isProduction && process.env.DATABASE_URL) {
    console.log("production environnement")
    // Production config using Heroku's DATABASE_URL
    const parseDatabaseUrl = (url: string) => {
    const regex = /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
    const match = url.match(regex);

    if (!match) {
      throw new Error('DATABASE_URL is not in the correct format');
    }

    return {
      username: match[1],
      password: match[2],
      host: match[3],
      port: parseInt(match[4], 10),
      database: match[5],
    };
  };

  const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL);

  config = {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: false, // Mettre à false en production
    entities: ['dist/**/*.entity{.ts,.js}'],
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  // Local development config
  config = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true, // Activer en développement
    entities: ['dist/**/*.entity{.ts,.js}'],
  };
}

export { config };
