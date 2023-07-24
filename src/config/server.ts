import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@libs/corsOptions';
import express, { Express } from 'express';

export const app: Express = express();

// configuracion de express

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
