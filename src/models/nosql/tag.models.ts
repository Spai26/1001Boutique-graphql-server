import { ITag, ITagDocument } from '@interfaces/tag.interfaces';
import mongoose, { Model, Schema, model } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const TagSchema = new Schema<ITagDocument, Model<ITag>>({
  name: { type: String, unique: true, require: true },
  slug: { type: String, slug: 'name' }
});

export const TagModel = model<ITagDocument>('Tag', TagSchema);
