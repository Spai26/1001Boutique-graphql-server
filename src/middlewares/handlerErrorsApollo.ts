import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

interface ErrorType {
  errorCode: ApolloServerErrorCode | string;
  errorStatus: number;
}

/**
 * *list of error for assign
 */
export const typesErrors: Record<string, ErrorType> = {
  BAD_USER_INPUT: {
    errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
    errorStatus: 400
  },

  BAD_REQUEST: {
    errorCode: ApolloServerErrorCode.BAD_REQUEST,
    errorStatus: 400
  },

  INTERNAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500
  },

  DATABASE_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500
  },

  ROL_NOT_VALID: {
    errorCode: 'ROL NOT VALID',
    errorStatus: 401
  },

  UNAUTHENTIFATED: {
    errorCode: 'UNAUTHENTIFATED',
    errorStatus: 401
  },

  UNAUTHORIZED: {
    errorCode: 'UNAUTHORIZED',
    errorStatus: 401
  },

  NOT_FOUND: {
    errorCode: 'NOT_FOUND',
    errorStatus: 404
  },

  ALREADY_EXIST: {
    errorCode: 'ALREADY_EXIST',
    errorStatus: 400
  }
};

export const handlerHttpError = (
  messageError: string,
  typesErrors: ErrorType
) => {
  const { errorCode, errorStatus } = typesErrors;
  return new GraphQLError(messageError, {
    extensions: {
      code: errorCode,
      http: { status: errorStatus }
    }
  });
};
