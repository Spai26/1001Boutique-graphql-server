import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@libs/corsOptions';
import express, { Express } from 'express';

export const app: Express = express();

// configuracion de express

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
