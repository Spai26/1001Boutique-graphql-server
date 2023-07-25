import { updateElement } from '@helpers/querys/RolesandPermisions.query';
import { getModelByName, isExistById } from '@helpers/querys/generalConsult';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

const MUser = getModelByName('user');
const MRol = getModelByName('rol');
export const updateRolesAndPermission = async (values) => {
  try {
    const updatePromiseArray = values.map((fieldForUpdate) => {
      const { id } = fieldForUpdate;

      if (!isExistById(id, 'rol')) {
        throw handlerHttpError('invalid role', typesErrors.BAD_REQUEST);
      }

      return updateElement(fieldForUpdate);
    });

    const result = await Promise.all(updatePromiseArray);

    if (result) {
      return {
        message: 'fields updated!',
        success: true
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

export const authDeleteRoles = async (id) => {
  let result;

  try {
    const exist = await isExistById(id, 'rol');

    if (exist) {
      await MRol.findByIdAndDelete(id);

      // encontrar todas las coincidencias para eliminar
      // eslint-disable-next-line no-underscore-dangle
      result = await MUser.updateMany({ rol: exist._id }, { roll: null });
    }

    if (result) {
      return {
        message: 'fields deleted!',
        success: true
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
