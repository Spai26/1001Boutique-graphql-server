import { IBlog } from '@interfaces/blog.interface';
import { BaseRepository } from './base.repository';

export class BlogRepository extends BaseRepository<IBlog> {
  async getBlogWithPopulations(): Promise<IBlog[]> {
    return this.model.find().populate('author').populate('front_image');
  }

  async getByIdWithPopulate(id: string): Promise<IBlog> {
    return this.model.findById(id).populate('front_image');
  }

  async incrementViewField(id: string) {
    await this.model.updateOne({ _id: id }, { $inc: { count_view: 1 } });
    return this.model.findById(id).populate('author').populate('front_image');
  }

  async getBlogAuthor(id: string) {
    return this.model
      .find({ author: id })
      .populate('author')
      .populate('front_image');
  }

  async searchBlogByField(field: string, text: string) {
    const query = {};
    query[field] = { $regex: text, $options: 'i' };
    return this.model.find(query).populate('author').populate('front_image');
  }
}
