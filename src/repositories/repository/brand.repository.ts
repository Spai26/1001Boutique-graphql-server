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
}
