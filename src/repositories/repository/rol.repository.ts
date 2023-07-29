import { IRol } from '@interfaces/rol.interface';
import { BaseRepository } from './base.repository';

export class RolRepository extends BaseRepository<IRol> {
  async getRolWithPopulation() {
    return this.model.find().populate('permissions');
  }
}
