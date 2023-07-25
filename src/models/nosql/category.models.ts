import slug from 'mongoose-slug-generator';
import mongoose, { Model, Schema, model } from 'mongoose';
import { ICategory, ICategoryDocument } from '@interfaces/index';

mongoose.plugin(slug);

const CategorySchema = new Schema<ICategoryDocument, Model<ICategory>>(
  {
    name: { type: String, require: true, unique: true },
    slug: { type: String, slug: 'name' }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false
  }
);

export const CategoryModel = model<ICategoryDocument, Model<ICategory>>(
  'Category',
  CategorySchema
);
