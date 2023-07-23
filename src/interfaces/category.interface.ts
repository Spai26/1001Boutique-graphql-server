import { Document, Model } from 'mongoose';

//amount llevar un contador de los usados ?? a ver
export interface ICategory {
  name: string;
  slug: string;
}

export interface ICategoryDocument extends ICategory, Document {}

export interface ICategoyModel extends Model<ICategoryDocument> {
  updateSlug(id: string): Promise<ICategory>;
}
