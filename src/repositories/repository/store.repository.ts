import { IStore } from '@interfaces/store.interface';
import { BaseRepository } from './base.repository';

export class StoreRepository extends BaseRepository<IStore> {
  async getAllWithPopulationOnwer(id) {
    // restringuir algunos campos de onwer
    return this.model
      .find({ onwer: id })
      .populate('logo')
      .populate('onwer')
      .populate('tags')
      .populate('categories')
      .populate('main_image')
      .populate('gallery');
  }

  async getByIdPopulate(id) {
    return this.model
      .findById(id)
      .populate('logo')
      .populate('onwer')
      .populate('main_image')
      .populate('gallery')
      .populate('tags')
      .populate('categories');
  }
}
