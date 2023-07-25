import * as jwt from 'jsonwebtoken';
import { keys } from '@config/variables';
import { IUserAuth } from '@interfaces/types/type.custom';
import {
  handlerHttpError,
  typesErrors
} from '../middlewares/handlerErrorsApollo';

let decodedToken: string | jwt.JwtPayload;

export const createAccesToken = ({ id, rol }: IUserAuth): string => {
  try {
    decodedToken = jwt.sign({ id, rol }, keys.SECRET, {
      expiresIn: keys.TOKEN_TIME
    });

    return decodedToken;
  } catch (error) {
    throw handlerHttpError(
      'Error generating token.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};

export const CheckVerifyToken = (
  token: string
) /* : Promise<jwt.JwtPayload> */ => {
  try {
    if (token) {
      decodedToken = jwt.verify(token, keys.SECRET);

      return decodedToken as jwt.JwtPayload;
    }
    return null;
  } catch (error) {
    throw handlerHttpError(
      'Error this token no valid.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
