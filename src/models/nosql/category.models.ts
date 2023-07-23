import slug from 'mongoose-slug-generator';
import mongoose, { Schema, model } from 'mongoose';
import { ICategoyModel, ICategoryDocument } from '@interfaces/index';

mongoose.plugin(slug);

const CategorySchema = new Schema<ICategoryDocument, ICategoyModel>(
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

CategorySchema.statics.updateSlug = async function (id: string) {
  let result = null;
  const current = await this.findById(id);

  if (!current) {
    return;
  }

  // Actualizar el slug basado en el título
  current.slug = current.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  // Guardar los cambios en la base de datos
  result = await current.save();
  return result;
};

export const CategoryModel = model<ICategoryDocument, ICategoyModel>(
  'Category',
  CategorySchema
);
