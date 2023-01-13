import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: '7437',
    port: 5432,
    host: 'localhost',
    database: 'recipesManager',
    // synchronize permet de créer la db à chaque lancement de l'appli
    // A mettre a true que en dev
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
}