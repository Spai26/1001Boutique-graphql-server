import { Request, Response } from 'express';
import { IPropsTypes } from './type.custom';

export interface IUserAuth {
  id: IPropsTypes<string>;
  rol: IPropsTypes<string>;
  alias: IPropsTypes<string>;
}

export interface ICtx {
  user?: IUserAuth;
  req: Request;
  res: Response;
}
