/* eslint-disable no-underscore-dangle */
import { IUser } from '@interfaces/user.interface';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<IUser> {
  async populateByContext(id: string): Promise<IUser> {
    return this.model.findById(id).populate('blogs');
  }
}
