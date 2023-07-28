import { IImage } from '@interfaces/image.interface';
import { BaseRepository } from './base.repository';

export class ImageRepository extends BaseRepository<IImage> {
  async setSingleImage(data): Promise<IImage> {
    return this.model.create(data);
  }

  async generateArrayImages(values) {
    const result = await Promise.all(
      values.gallery.map((element) => {
        return this.model.create({ ...element, source: values.source });
      })
    );
    return result;
  }

  async generateSingleImage(values) {
    return this.model.create(values);
  }
}
