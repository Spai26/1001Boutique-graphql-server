import { Request, Response } from 'express';
import { Types } from 'mongoose';

export interface IUserAuth {
  id: string;
  rol: Types.ObjectId;
  alias: string;
  blogs?: Array<Types.ObjectId>;
  brands?: Array<Types.ObjectId>;
}

export interface ICtx {
  user?: IUserAuth;
  req: Request;
  res: Response;
}
