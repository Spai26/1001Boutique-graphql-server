import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { IUser } from '@interfaces/user.interface';
import { userRepository } from '@repositories/repository';

export const createControllerUser = async (values) => {
  const { email } = values;
  try {
    const userExist = await userRepository.getByOne({ email });

    if (userExist) {
      throw handlerHttpError('try another email', typesErrors.ALREADY_EXIST);
    }

    const newuser: IUser = await userRepository.create(values);

    if (newuser) {
      return {
        message: 'User Created!',
        success: !!newuser
      };
    }
    return [];
  } catch (error) {
    throw handlerHttpError(
      `Error fn: attachUser ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateControllerUser = async (values) => {
  const { id, firstname, lastname, phone, website } = values;

  try {
    const updateUser = await userRepository.update(id, {
      firstname,
      lastname,
      phone,
      website
    });

    return {
      message: 'User updated!',
      succes: !!updateUser
    };
  } catch (error) {
    throw handlerHttpError(
      `Error fn: updateUser ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const deleteWithAllRelations = async (id) => {
  return `delete user ${id}`;
};
