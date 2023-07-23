import { RolModel } from '@models/nosql/roles.models';
import { PermisionModel } from '@models/nosql/permission.models';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

/**
 * * Verifica si la lista es un array valido
 * @param elements
 * @returns Boolean
 */
export const checkArrayElement = (elements) => {
  if (Array.isArray(elements) && elements.length > 0) {
    return true;
  }
};

/**
 * * Compara la lista de permisos coincide con los ingresados
 * @param listpermissions
 * @returns Boolean
 */
export const assignPermissions = async (
  listpermissions: string[]
): Promise<string | boolean> => {
  //find all permissions[]
  const search_permissions_list = await PermisionModel.find({
    _id: { $in: listpermissions }
  });

  //convert to array list
  const extractIdSearch = search_permissions_list.map((p) => p._id.toString());

  //list is equal on search
  const isListEqual = listpermissions.every((p) => extractIdSearch.includes(p));

  if (!isListEqual) {
    throw handlerHttpError(
      'Permission no valid, please verified',
      typesErrors.BAD_REQUEST
    );
  }

  return isListEqual;
};

/**
 * * Encuentra y actualizar el campo mediante ID
 * @param elements
 * @returns Promise Query
 */
export const updateElement = async (elements) => {
  let result = undefined;
  const { id, name, description, permissions } = elements;

  const validArray = await checkArrayElement(permissions);

  if (validArray) {
    const valid_Array_Permission = await assignPermissions(permissions);

    if (valid_Array_Permission) {
      result = await RolModel.findByIdAndUpdate(id, {
        name,
        description,
        permissions
      });
    }
  }

  result = await RolModel.findByIdAndUpdate(id, { name, description });

  return result;
};
