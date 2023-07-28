/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { IBlog } from '../blog.interface';

export interface IPropsTypes<T> {
  [key: string]: T;
}

export enum ROL {
  USUARIO = 'usuario',
  VENDOR = 'vendor',
  EDITOR = 'editor',
  BRAND = 'brand',
  ADMIN = 'administrator',
  ROOT = 0
}

export enum PERMISSIONS {
  CREATE = 'created',
  READ = 'read',
  UPDATE = 'updated',
  DELETE = 'deleted'
}

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

export interface ResponseResult {
  message: string;
  success: boolean;
}

export interface ResponseModel extends ResponseResult {
  blog: IBlog;
}
