import {
  Model,
  Document,
  FilterQuery,
  QueryWithHelpers,
  QueryOptions,
  UpdateWriteOpResult
} from 'mongoose';

export class BaseRepository<T extends Document> {
  public model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    return this.model.find();
  }

  async getAllWithOption(options?: QueryOptions): Promise<T[]> {
    return this.model.find(options);
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async getByOne(
    conditions: FilterQuery<T>
  ): Promise<QueryWithHelpers<T | null, T>> {
    return this.model.findOne(conditions);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, newData: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }

  async updateMany(
    filter: FilterQuery<T>,
    conditions: QueryOptions
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, conditions);
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
