/* eslint-disable no-unused-vars */
import mongoose, { Document, Model } from 'mongoose';
import { IBrand } from './brand.interface';
import { IStore } from './store.interface';
import { IBlog } from './blog.interface';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  phone: string;
  website?: string;
  password: string;
  rol: mongoose.Types.ObjectId; // ref 'rol'
  blogs?: Array<mongoose.Types.ObjectId | IBlog>;
  brands?: mongoose.Types.DocumentArray<IBrand>;
  stores?: mongoose.Types.DocumentArray<IStore>;
}

/**
 * methods functions
 */
export interface IUserDocument extends IUser, Document {
  encryptPassword(password: string): Promise<string>;
}

/**
 * static functions
 */
export interface IUserModel extends Model<IUserDocument> {
  comparePassword(password: string, recivePassword: string): Promise<boolean>;
}
