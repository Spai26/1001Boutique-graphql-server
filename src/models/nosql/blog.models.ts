import slug from 'mongoose-slug-generator';
import { IBlog } from '@interfaces/blog.interface';
import mongoose, { Schema, model } from 'mongoose';

mongoose.plugin(slug);

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, require: true, unique: true },
    body_content: { type: String, require: true },
    front_image: { type: Schema.Types.ObjectId, ref: 'Image' },
    slug_title: { type: String, slug: 'title' },
    count_view: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: Boolean },
    origin: { type: String }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false
  }
);

export const BlogModel = model<IBlog>('Blog', BlogSchema);
