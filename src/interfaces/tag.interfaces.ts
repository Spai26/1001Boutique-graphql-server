import { Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  slug: string;
}

export interface ITagDocument extends ITag, Document {}
