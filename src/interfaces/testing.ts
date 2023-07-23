import mongoose, { Document } from 'mongoose';
import { IImage } from './image.interface';

export interface ITest {
  image: mongoose.Types.ObjectId;
  gallery: mongoose.Types.DocumentArray<IImage>;
}

export interface ITestDocument extends ITest, Document {}
