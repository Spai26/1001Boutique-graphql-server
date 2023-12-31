/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import mongoose, { Document } from 'mongoose';

enum imageTypes {
  GALLERY = 'gallery',
  IMAGE = 'image',
  LOGO = 'logo'
}

export interface IImage extends Document {
  url: string;
  model_id: mongoose.Types.ObjectId;
  model_type: imageTypes;
  source: string;
}

export interface IImageDocument extends IImage, Document {}
