import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10),
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_URL,
    // synchronize permet de créer la db à chaque lancement de l'appli
    // A mettre a true que en dev
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
}