import { updateElement } from '@helpers/querys/RolesandPermisions.query';
import {
  existFields,
  getModelByName,
  isExistById
} from '@helpers/querys/generalConsult';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

const MUser = getModelByName('user');
const MRol = getModelByName('rol');
export const updateRolesAndPermission = async (values) => {
  try {
    const updatePromiseArray = values.map(async (fieldForUpdate) => {
      const { id } = fieldForUpdate;

      if (!(await isExistById(id, 'rol'))) {
        throw handlerHttpError('invalid role', typesErrors.BAD_REQUEST);
      }

      return await updateElement(fieldForUpdate);
    });
    const result = await Promise.all(updatePromiseArray);

    if (result) {
      return {
        message: 'fields updated!',
        success: true
      };
    }
  } catch (error) {
    throw handlerHttpError(
      `Error fn: authRoles ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const authDeleteRoles = async (id) => {
  let updateRolDeleted;
  let result;

  try {
    //
    const exist = await isExistById(id, 'rol');

    if (exist) {
      updateRolDeleted = await MRol.findByIdAndDelete(id);

      //encontrar todas las coincidencias para eliminar
      result = await MUser.updateMany({ rol: exist._id }, { roll: null });
    }

    if (result) {
      return {
        message: 'fields deleted!',
        success: true
      };
    }
  } catch (error) {
    throw handlerHttpError(
      `Error fn: authDeleteRol ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
