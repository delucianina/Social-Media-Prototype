import express from 'express';
import { ApolloServer } from '@apollo/server';
import connection from './config/connection.js';
import cookieParser from 'cookie-parser';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import { expressMiddleware } from '@apollo/server/express4';
const app = express();
const PORT = process.env.PORT || 3333;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
connection.once('open', async () => {
    await server.start();
    //Middleware
    // Allows json to the attaached to req.body in our routes.
    app.use('/graphql', express.json(), 
    // Allow the resolvers to access client-side cookies through context.req.cookies 
    cookieParser(), 
    // Apollo server 
    expressMiddleware(server, {
        // Attach the context object for all resolvers - The return value of the function is what your context will be 
        context: async ({ req, res }) => {
            return {
                req: req,
                res: res
            };
        }
    }));
    app.listen(PORT, () => {
        console.log('Express server started on', PORT);
    });
});
