import { ApolloServer } from "@apollo/server";
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
// import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

dotenv.config();

// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
});

// Start the standalone server
// const { url } = await startStandaloneServer(server, {
//     listen: { port: 3000 },
// });

// console.log(`Server running at ${url}`);

export const graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
);