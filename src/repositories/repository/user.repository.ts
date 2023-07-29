/* eslint-disable no-underscore-dangle */
import { IUser } from '@interfaces/user.interface';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<IUser> {
  async populateByContext(id: string): Promise<IUser> {
    return this.model.findById(id).populate('blogs');
  }

  async populateWithSubDocument(): Promise<IUser[]> {
    const result = this.model.find({}).populate({
      path: 'rol',
      populate: {
        path: 'permissions'
      }
    });
    return result;
  }
}
