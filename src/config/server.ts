import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@libs/corsOptions';
import express, { Express } from 'express';

export const app: Express = express();

// configuracion de express

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Usar 'dev' solo en desarrollo
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
