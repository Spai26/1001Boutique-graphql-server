import { config } from 'dotenv';

//Configuracion de variables de entorno
config();

export const keys = {
  ORIGIN: process.env.URL_ORIGIN || '*',
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  NODE_ENV: process.env.NODE_ENV,
  //database
  URI: process.env.DATABASE_URL,
  //cloudinary
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_PASS: process.env.CLOUDINARY_PASS,
  //data root
  ROOTROL: process.env.ROOTROL,
  ROOTNAME: process.env.ROOTNAME,
  ROOTLAST: process.env.ROOTLAST,
  ROOTEMAIL: process.env.ROOTEMAIL,
  ROOTPASSWORD: process.env.ROOTPASSWORD,
  //jwt.
  SECRET: process.env.ACCESS_TOKEN_SECRET,
  TOKEN_TIME: process.env.TOKEN_EXPIRES
};
