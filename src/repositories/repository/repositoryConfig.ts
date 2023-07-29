import { IPermission } from '@interfaces/permission.interface';
import { BlogModel, PermisionModel, RolModel, UserModel } from '@models/nosql';
import { BaseRepository } from './base.repository';
import { UserRepository } from './user.repository';
import { RolRepository } from './rol.repository';
import { BlogRepository } from './blog.repository';

export const userRepository = new UserRepository(UserModel);
export const blogRepository = new BlogRepository(BlogModel);
export const rolRepository = new RolRepository(RolModel);
export const permissionRepository = new BaseRepository<IPermission>(
  PermisionModel
);
