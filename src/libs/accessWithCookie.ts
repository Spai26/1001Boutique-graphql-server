import { Response } from 'express';

export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie('access-token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // Tiempo de vida de la cookie (en milisegundos)
    //secure: true, // Solo enviar la cookie en conexiones seguras (HTTPS)
    sameSite: 'strict' // Restringir la cookie a solicitudes del mismo sitio
  });
};
