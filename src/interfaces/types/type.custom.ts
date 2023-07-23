import { Request, Response } from 'express';

export type IBaseCtx = {};

// !por probar
export interface ICtx {
  user?: IUserAuth;
  req: Request;
  res: Response;
}

//interface generico
export interface IPropsTypes<T> {
  [key: string]: T;
}

//
export interface IUserAuth {
  id: IPropsTypes<string>;
  rol: IPropsTypes<string>;
  alias: IPropsTypes<string>;
}

//variables static for rol
export enum ROL {
  USUARIO = 'usuario',
  VENDOR = 'vendor',
  EDITOR = 'editor',
  BRAND = 'brand',
  ADMIN = 'administrator',
  ROOT = 0
}

//variables static for permission
export enum PERMISSIONS {
  CREATE = 'created',
  READ = 'read',
  UPDATE = 'updated',
  DELETE = 'deleted'
}

//test item model
export interface listModel {
  user: string;
  blog: string;
  store: string;
  brand: string;
  rol: string;
  permission: string;
  image: string;
  tag: string;
  category: string;
  test: string;
}

//reponse
export interface ResponseResult {
  message: string;
  success: boolean;
}
