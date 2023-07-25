import { createAccesToken } from '@libs/generateJWT';
import { setAccessTokenCookie } from '@libs/accessWithCookie';
import { authLoginController } from '@controllers/auth/authSessions';

export const AuthResolvers = {
  Mutation: {
    AuthLogin: async (parent, { input }, { res }) => {
      const { _id, rol, username } = await authLoginController(input);

      const mytoken = await createAccesToken({
        id: _id,
        rol,
        alias: username
      });

      if (mytoken) {
        setAccessTokenCookie(res, mytoken);

        res.cookie('access-token', mytoken);
        return {
          mytoken,
          response: {
            message: 'Logued',
            success: true
          }
        };
      }
      return null;
    },

    authDisconnect: (parent, args, { res }) => {
      res.cookie('token', '');
      return {
        message: 'Good Bye!',
        success: false
      };
    }
  }
};
