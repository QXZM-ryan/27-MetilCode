import { DataSource } from 'typeorm';
import { User } from './models/User';
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true, // Sincroniza automaticamente o esquema
});

AppDataSource.initialize()
    .then(() => {
        console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao conectar com o banco de dados:', error);
    });