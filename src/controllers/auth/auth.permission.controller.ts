import {
  createNewDocument,
  existFields,
  getModelByName,
  isExistById,
  updateOneElement
} from '@helpers/querys/generalConsult';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { keyValueData } from '@utils/typesCustom';

const MPermission = getModelByName('permission');
const MRol = getModelByName('rol');

export const authAttachPermission = async (values: keyValueData<string>) => {
  try {
    const isExist = await existFields('permission', { name: values.name });

    if (isExist) {
      throw handlerHttpError(
        'this permission name already exists',
        typesErrors.ALREADY_EXIST
      );
    }

    const newvalue = await createNewDocument(values, 'permission');

    const result = await newvalue.save();

    if (result) {
      return {
        message: 'Permission add!',
        success: true
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

export const authUpdatePermission = async (values: keyValueData<string>) => {
  try {
    const { id } = values;
    const isExist = await isExistById(id, 'permission');

    if (!isExist) {
      throw handlerHttpError('invalid permission', typesErrors.BAD_REQUEST);
    }

    const result = await updateOneElement(
      // eslint-disable-next-line no-underscore-dangle
      { _id: isExist._id },
      values,
      'permission'
    );

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

export const authDeletePermission = async (id: keyValueData<string>[]) => {
  let updatePermissionDeleted = null;

  try {
    const deletePromiseArray = id.map((data) => {
      return MPermission.findByIdAndDelete({ _id: data });
    });

    const result = await Promise.all(deletePromiseArray);

    if (result.every((value) => value === null)) {
      throw handlerHttpError('The fields dont exist', typesErrors.NOT_FOUND);
    }

    if (result) {
      updatePermissionDeleted = await MRol.updateMany(
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
