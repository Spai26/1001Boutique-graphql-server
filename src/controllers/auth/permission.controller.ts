/* eslint-disable no-underscore-dangle */
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { permissionRepository, rolRepository } from '@repositories/repository';

export const authAttachPermission = async (values) => {
  try {
    const isExist = await permissionRepository.getByOne({ name: values.name });

    if (isExist) {
      throw handlerHttpError(
        'this permission name already exists',
        typesErrors.ALREADY_EXIST
      );
    }

    const newvalue = await permissionRepository.create(values);

    if (newvalue) {
      return {
        message: 'Permission add!',
        success: !!newvalue
      };
    }
    return [];
  } catch (error) {
    throw handlerHttpError(
      `Error fn: authPermission ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const authUpdatePermission = async (values) => {
  try {
    const { id } = values;
    const isExist = await permissionRepository.getById(id);

    if (!isExist) {
      throw handlerHttpError('invalid permission', typesErrors.BAD_REQUEST);
    }

    const result = await permissionRepository.update(isExist._id, values);

    if (result) {
      return {
        message: 'fields updated!',
        success: !!result
      };
    }
    return [];
  } catch (error) {
    throw handlerHttpError(
      `Error fn: authUpdatePermission ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const authDeletePermission = async (id) => {
  let updatePermissionDeleted = null;

  try {
    const deletePromiseArray = id.map((data) => {
      return permissionRepository.delete(data);
    });

    const result = await Promise.all(deletePromiseArray);

    if (result.every((value) => value === null)) {
      throw handlerHttpError('The fields dont exist', typesErrors.NOT_FOUND);
    }

    if (result) {
      updatePermissionDeleted = await rolRepository.updateMany(
        {
          permissions: { $in: id }
        },
        { $pull: { permissions: { $in: id } } }
      );
    }

    if (result || updatePermissionDeleted) {
      return {
        message: 'fields deleted and relations!',
        success: true
      };
    }
    return [];
  } catch (error) {
    throw handlerHttpError(
      `Error fn: authDeletePermission ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
