import mongoose, { Document } from 'mongoose';
import { IPermission } from './permission.interface';

export interface IRol {
  name: string;
  description: string;
  permissions?: mongoose.Types.DocumentArray<IPermission>;
}

export interface IRolDocument extends IRol, Document {}
