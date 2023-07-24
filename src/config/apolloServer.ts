import http from 'node:http';
import cors from 'cors';

import { corsOptions } from '@libs/corsOptions';
import { logger } from '@libs/winstom.lib';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLSchema } from 'graphql';

import { apiRoute } from '@routes/index';

import {
  getTokenforRequest,
  IContext,
  BaseContext
} from '@middlewares/authorization/apolloContext';
import { keys } from './variables';
import { app } from './server';

export async function startApolloServer(typeDefs, resolvers): Promise<void> {
  const httpServer = http.createServer(app);

  //  graphql-tols/schema
  const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer<IContext>({
    schema,
    introspection: keys.NODE_ENV !== 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  //  raiz api_rest
  app.use('/api', apiRoute);

  //  raiz graphql
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const user = (await getTokenforRequest(req)) as BaseContext;
        return { user, req, res };
      }
    })
  );

  await new Promise<void>((resolve) => {
    httpServer.listen(
      {
        port: keys.PORT
      },
      resolve
    );
  });

  logger.info(`Node env on ${keys.NODE_ENV}`);
  logger.info(`✓ Server running on ${keys.HOST}:${keys.PORT}`);
  logger.info(`✓ GraphQL running on ${keys.HOST}:${keys.PORT}/graphql`);
}
