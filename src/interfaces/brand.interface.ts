import mongoose, { Document } from 'mongoose';
import { IImage } from './image.interface';

export interface IBrand extends Document {
  title: string;
  sub_title: string;
  biografy: string;
  short_biografy: string;
  slug: string;
  logo: mongoose.Types.ObjectId; // ref 'image'
  gallery: mongoose.Types.DocumentArray<IImage>;
  collections?: string;
  count_view: number;
  onwer: mongoose.Types.ObjectId;
}

export interface IBrandDocument extends IBrand, Document {}
