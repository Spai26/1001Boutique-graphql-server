/* eslint-disable no-underscore-dangle */
import { updateElement } from '@helpers/querys/RolesandPermisions.query';

import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { userRepository, rolRepository } from '@repositories/repository';

export const updateRolesAndPermission = async (values) => {
  try {
    const updatePromiseArray = values.map((fieldForUpdate) => {
      const { id } = fieldForUpdate;
      const findRol = rolRepository.getById(id);
      if (!findRol) {
        throw handlerHttpError('invalid role', typesErrors.BAD_REQUEST);
      }

      return updateElement(fieldForUpdate);
    });

    const result = await Promise.all(updatePromiseArray);

    if (result) {
      return {
        message: 'fields updated!',
        success: !!result
      };
    }
    return [];
  } catch (error) {
    throw handlerHttpError(
      `Error fn: authRoles ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const authDeleteRoles = async (id: string) => {
  let result;

  try {
    const exist = await rolRepository.getById(id);

    if (exist) {
      await rolRepository.delete(id);
      result = await userRepository.updateMany(
        { rol: exist._id },
        { roll: null }
      );
    }

    if (result) {
      return {
        message: 'fields deleted!',
        success: !!result
      };
    }
    return [];
  } catch (error) {
    throw handlerHttpError(
      `Error fn: authDeleteRol ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
