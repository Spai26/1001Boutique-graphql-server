import { IImage, IImageDocument } from '@interfaces/image.interface';
import { Model, Schema, model } from 'mongoose';

const Imageschema = new Schema<IImageDocument, Model<IImage>>(
  {
    url: { type: String, require: true },
    model_id: { type: Schema.Types.ObjectId, require: true },
    model_type: { type: String, require: true },
    source: { type: String, require: true }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false
  }
);

export const ImageModel = model<IImageDocument, Model<IImage>>(
  'Image',
  Imageschema
);
