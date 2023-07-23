import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { CheckVerifyToken } from '@libs/generateJWT';
import { JwtPayload } from 'jsonwebtoken';
import { isExistById } from '../../helpers/querys/generalConsult';
import { Request, Response } from 'express';
import { IUserAuth } from '@interfaces/types/type.custom';

export type BaseContext = {};

export interface IContext {
  user?: BaseContext | string;
  req: Request;
  res: Response;
}

interface customRequest extends Request {
  user?: any;
}

export const getTokenforRequest = async (req: customRequest) => {
  let token: string = null;
  let currentUser = null;
  try {
    //Bearer token
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

      //asign user on req
      req.user = user;

      return user;
    }
  } catch (error) {
    throw handlerHttpError(
      'Error Access no valid or expired.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
