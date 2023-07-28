import { Model, Document, FilterQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
  public model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    return this.model.find();
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, newData: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async deleteOne(conditions: FilterQuery<T>) {
    return this.model.deleteOne(conditions);
  }

  async searchByField(field: string, text: string) {
    const query = {};
    query[field] = { $regex: text, $options: 'i' };
    return this.model.find(query);
  }
}
