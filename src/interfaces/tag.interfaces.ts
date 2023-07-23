import { Document, Model } from 'mongoose';

//amount llevar un contador de los usados ?? a ver
export interface ITag {
  name: string;
  slug: string;
}

export interface ITagDocument extends ITag, Document {}
