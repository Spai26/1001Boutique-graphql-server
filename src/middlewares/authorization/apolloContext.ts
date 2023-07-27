/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { CheckVerifyToken } from '@libs/generateJWT';
import { JwtPayload } from 'jsonwebtoken';
import { isExistById } from '@helpers/querys/generalConsult';
import { Request } from 'express';
import { IUserAuth } from '@interfaces/types/context';

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
        const payload: JwtPayload = await CheckVerifyToken(token);

        currentUser = await isExistById(payload.id, 'user');
      }

      const user: IUserAuth = {
        id: currentUser._id,
        rol: currentUser.rol,
        alias: currentUser.username
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
