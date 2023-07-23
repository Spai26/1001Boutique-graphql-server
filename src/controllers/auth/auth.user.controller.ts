import { HydratedDocument } from 'mongoose';

import {
  createNewDocument,
  getModelByName,
  updateOneElement
} from '@helpers/querys/generalConsult';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { IUser } from '@interfaces/user.interface';

let currentResult = null;
const user = getModelByName('user');

export const attachUserInDB = async (values) => {
  const { email } = values;
  try {
    const userExist = await user.findOne({ email });

    if (userExist) {
      throw handlerHttpError('try another email', typesErrors.ALREADY_EXIST);
    }

    const newuser: HydratedDocument<IUser> = await createNewDocument(
      values,
      'user'
    );

    currentResult = await newuser.save();

    if (currentResult) {
      return {
        message: 'User Created!',
        success: true
      };
    }
  } catch (error) {
    throw handlerHttpError(
      `Error fn: attachUser ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const getUserForId = async (email) => {
  try {
    return await user.findOne({ email: email });
  } catch (error) {
    throw handlerHttpError(
      `Error fn: searchUser ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateControllerUser = async (values: any) => {
  const { id, firstname, lastname, phone, website } = values;

  try {
    currentResult = await updateOneElement(
      { _id: id },
      {
        firstname,
        lastname,
        phone,
        website
      },
      'user'
    );

    return {
      succes: true,
      message: 'User updated!'
    };
  } catch (error) {
    throw handlerHttpError(
      `Error fn: updateUser ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const deleteWithAllRelations = async (id) => {};
