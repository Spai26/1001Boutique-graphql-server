import { Document } from 'mongoose';
export interface IPermission {
  name: string;
  description?: string;
}

export interface IPermisionDocument extends IPermission, Document {}
