import 'reflect-metadata'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { AppDataSource } from './database';
import { User } from './models/User';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

// Iniciar o servidor
AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}).catch(error => console.log(error));