import { IBrand } from '@interfaces/brand.interface';
import { BaseRepository } from './base.repository';

export class BrandRepository extends BaseRepository<IBrand> {
  async getAllWithPopulation(): Promise<IBrand[]> {
    return this.model
      .find()
      .populate('onwer')
      .populate('logo')
      .populate('gallery');
  }

  async getByIdWithPopulation(id: string): Promise<IBrand[]> {
    return this.model
      .findById(id)
      .populate('onwer')
      .populate('logo')
      .populate('gallery');
  }

  async searchBrandByField(field: string, text: string) {
    const query = {};
    query[field] = { $regex: text, $options: 'i' };
    return this.model
      .find(query)
      .populate('onwer')
      .populate('logo')
      .populate('gallery');
  }

  async incrementViewField(id: string) {
    await this.model.updateOne({ _id: id }, { $inc: { count_view: 1 } });
    return this.model
      .findById(id)
      .populate('onwer')
      .populate('logo')
      .populate('gallery');
  }
}
