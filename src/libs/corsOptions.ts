import { keys } from '@config/variables';

export const corsOptions = {
  origin: keys.ORIGIN, // Permitir todos los orígenes
  allowedHeaders:
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true // Habilitar el envío de cookies
};
