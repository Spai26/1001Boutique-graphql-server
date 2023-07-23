import slug from 'mongoose-slug-generator';
import { IStore, IStoreDocument } from '@interfaces/store.interface';
import mongoose, { Model, Schema, model } from 'mongoose';

mongoose.plugin(slug);

const Storechema = new Schema<IStoreDocument, Model<IStore>>(
  {
    title: { type: String, required: true, unique: true },
    sub_title: { type: String },
    slug: { type: String, slug: 'title' },
    description: { type: String, required: true },
    main_image: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
    logo: { type: Schema.Types.ObjectId, ref: 'Image' },
    phone: { type: String, required: true },
    address: { type: String },
    positionX: { type: String },
    positionY: { type: String },
    region: { type: String },
    country: { type: String },
    count_view: { type: Number },
    url_video: { type: String },
    url_website: { type: String },
    status: { type: Boolean },
    email: { type: String, required: true },
    socials: [
      {
        name_social: { type: String },
        url: { type: String }
      }
    ],
    times_tables: [
      {
        week_name: { type: String },
        open_time: { type: String },
        close_time: { type: String },
        open: { type: Boolean }
      }
    ],
    onwer: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    gallery: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false
  }
);

export const StoreModel = model<IStoreDocument, Model<IStore>>(
  'Store',
  Storechema
);
