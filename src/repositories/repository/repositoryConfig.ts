import { IPermission, ICategory, ITag } from '@interfaces/index';
import {
  BlogModel,
  BrandModel,
  CategoryModel,
  ImageModel,
  PermisionModel,
  RolModel,
  TagModel,
  UserModel
} from '@models/nosql';
import { BaseRepository } from './base.repository';
import { UserRepository } from './user.repository';
import { RolRepository } from './rol.repository';
import { BlogRepository } from './blog.repository';
import { BrandRepository } from './brand.repository';
import { ImageRepository } from './image.repository';

export const userRepository = new UserRepository(UserModel);
export const blogRepository = new BlogRepository(BlogModel);
export const rolRepository = new RolRepository(RolModel);
export const permissionRepository = new BaseRepository<IPermission>(
  PermisionModel
);
export const categoryRepository = new BaseRepository<ICategory>(CategoryModel);
export const tagRepository = new BaseRepository<ITag>(TagModel);
export const brandRepository = new BrandRepository(BrandModel);
export const imageRepository = new ImageRepository(ImageModel);
