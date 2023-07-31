import { IStore } from '@interfaces/store.interface';
import { BaseRepository } from './base.repository';

export class StoreRepository extends BaseRepository<IStore> {
  async getAllWithPopulation() {
    // restringuir algunos campos de onwer
    return this.model
      .find()
      .populate('logo')
      .populate('onwer')
      .populate('tags')
      .populate('categories')
      .populate('main_image')
      .populate('gallery');
  }

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

  async incrementViewField(id: string) {
    await this.model.updateOne({ _id: id }, { $inc: { count_view: 1 } });
    return this.model
      .findById(id)
      .populate('logo')
      .populate('onwer')
      .populate('main_image')
      .populate('gallery')
      .populate('tags')
      .populate('categories');
  }

  async searchBlogByField(field: string, text: string) {
    const query = {};
    query[field] = { $regex: text, $options: 'i' };
    return this.model
      .find(query)
      .populate('logo')
      .populate('onwer')
      .populate('main_image')
      .populate('gallery')
      .populate('tags')
      .populate('categories');
  }
}
