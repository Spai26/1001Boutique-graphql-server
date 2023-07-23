import { startApolloServer } from '@config/apolloServer';
import { typeDefs, resolvers } from '@graphql/schema';

import { connectionDB } from '@config/database';
import { createRoles, createPermissionBase, createUser } from '@models/seed';

//database
connectionDB();

//data base for work
createRoles();
createPermissionBase();
createUser();

//init apollo server
startApolloServer(typeDefs, resolvers);
