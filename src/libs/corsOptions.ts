import { keys } from '@config/variables';
import { CorsOptions } from 'cors';

const url_origin: string = keys.ORIGIN;

export const corsOptions: CorsOptions = {
  origin: url_origin || '*', // Permitir todos los orígenes
  allowedHeaders:
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true // Habilitar el envío de cookies
};
