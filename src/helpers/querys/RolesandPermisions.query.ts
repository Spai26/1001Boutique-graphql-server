/* eslint-disable no-underscore-dangle */

import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { permissionRepository, rolRepository } from '@repositories/repository';
import { checkArrayElement } from '@utils/textManipulation';

/**
 * * Compara la lista de permisos coincide con los ingresados
 * @param listpermissions
 * @returns Boolean
 */
export const assignPermissions = async (
  listpermissions: string[]
): Promise<string | boolean> => {
  // find all permissions[]
  const search_permissions_list = await permissionRepository.getAllWithOption({
    _id: { $in: listpermissions }
  });

  // convert to array list
  const extractIdSearch = search_permissions_list.map((p) => p._id.toString());

  // list is equal on search
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
  let result;
  const { id, name, description, permissions } = elements;

  const validArray = checkArrayElement(permissions);

  if (validArray) {
    // TODO: lista de permisos
    const valid_Array_Permission = await assignPermissions(permissions);

    if (valid_Array_Permission) {
      result = await rolRepository.update(id, {
        name,
        description,
        permissions
      });
    }
  }

  result = await rolRepository.update(id, { name, description });

  return result;
};
