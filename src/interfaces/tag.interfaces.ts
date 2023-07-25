import { Document } from 'mongoose';

export interface ITag {
  name: string;
  slug: string;
}

export interface ITagDocument extends ITag, Document {}
