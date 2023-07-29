import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { UserModel } from '@models/nosql';
import { userRepository } from '@repositories/repository';

export const authLoginController = async (values) => {
  const { email, password } = values;

  try {
    const isValidUser = await userRepository.getByOne({ email });

    if (!isValidUser) {
      throw handlerHttpError(
        'Invalid credentials, please verified your email or password.',
        typesErrors.NOT_FOUND
      );
    }

    const validPass = await UserModel.comparePassword(
      password,
      isValidUser.password
    );

    if (!validPass) {
      throw handlerHttpError(
        'Invalid credentials, please verified your email or password.',
        typesErrors.UNAUTHENTIFATED
      );
    }

    return isValidUser;
  } catch (error) {
    throw handlerHttpError(
      `Error fn: login ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
