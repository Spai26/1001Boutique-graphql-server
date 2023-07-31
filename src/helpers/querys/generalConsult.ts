/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICtx, listNameArray } from '@interfaces/index';
import { userRepository } from '@repositories/repository';

export const addToArray = async (
  ctx: ICtx,
  value, // string
  field: keyof listNameArray
) => {
  const { id } = ctx.user;
  const user = await userRepository.getById(id);

  const fileds_options = {
    blogs: () => user.blogs.push(value),
    brands: () => user.brands.push(value),
    stores: () => user.stores.push(value)
  };
  // TODO: ejecutamos la funcion
  if (fileds_options[field]) {
    fileds_options[field]();
  }
  const result = await user.save();
  return result;
};
