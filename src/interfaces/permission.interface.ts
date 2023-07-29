import { Document } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  description?: string;
}

export interface IPermisionDocument extends IPermission, Document {}
