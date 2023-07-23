import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
    // Agrega otros transportes según tus necesidades, como archivos o servicios de terceros
  ]
});
