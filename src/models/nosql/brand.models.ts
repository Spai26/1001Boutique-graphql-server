import mongoose, { Model, Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';

import { IBrand, IBrandDocument } from '@interfaces/brand.interface';

mongoose.plugin(slug);

const BrandShema = new Schema<IBrandDocument, Model<IBrand>>(
  {
    title: { type: String, require: true, unique: true },
    sub_title: { type: String },
    biografy: { type: String },
    short_biografy: { type: String },
    slug: { type: String, slug: 'title' },
    logo: { type: Schema.Types.ObjectId, ref: 'Image' },
    gallery: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    onwer: { type: Schema.Types.ObjectId, ref: 'User' },
    collections: { type: String },
    count_view: { type: Number }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false
  }
);

export const BrandModel = model<IBrandDocument, Model<IBrand>>(
  'Brand',
  BrandShema
);
