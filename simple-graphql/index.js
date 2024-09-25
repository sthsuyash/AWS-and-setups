import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import serverlessExpress from '@vendia/serverless-express';
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDb } from "./db/connectDb.js";

import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();

// Create a new MongoDBStore instance
const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

store.on("error", function (error) {
    console.log(error);
});

// Express session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Create Apollo Server
const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
});

await server.start();

// Middleware for Apollo Server with express, integrating CORS and session handling
app.use(
    cors({
        origin: '*',  
        credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            const { event, context } = serverlessExpress.getCurrentInvoke();
            return buildContext({
                req,
                res,
                lambdaEvent: event,
                lambdaContext: context,
            });
        },
    }),
);

// Connect to MongoDB
await connectDb();

// Export the handler for AWS Lambda
export const handler = serverlessExpress({ app });
