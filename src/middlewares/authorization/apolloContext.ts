/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { CheckVerifyToken } from '@libs/generateJWT';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { IUserAuth } from '@interfaces/types/context';
import { userRepository } from '@repositories/repository';

interface customRequest extends Request {
  user?: IUserAuth;
}

export const getTokenforRequest = async (req: customRequest) => {
  let token: string = null;
  let currentUser = null;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ').pop();

      if (token) {
        const { id }: JwtPayload = await CheckVerifyToken(token);

        currentUser = await userRepository.getById(id);
      }

      const user: IUserAuth = {
        id: currentUser._id,
        rol: currentUser.rol,
        alias: currentUser.username,
        blogs: currentUser.blogs,
        brands: currentUser.brands,
        stores: currentUser.stores
      };

      req.user = user;

      return user;
    }
    return null;
  } catch (error) {
    throw handlerHttpError(
      'Error Access no valid or expired.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
