"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_1 = require("apollo-server");
const index_1 = require("../graphql/typesDefs/index");
const index_2 = require("../graphql/resolvers/index");
const server = new apollo_server_1.ApolloServer({
    typeDefs: index_1.typeDefs,
    resolvers: index_2.resolvers,
    context: ({ req }) => {
        return { req }; // Make sure the 'req' object is available in context
    },
    introspection: true,
    debug: true,
    formatError: (error) => {
        console.error(error);
        // Optionally, customize the error message sent to the client
        return {
            message: 'Internal server error',
            locations: error.locations,
            path: error.path,
            extensions: {
                code: error.extensions.code,
            },
        };
    },
});
exports.server = server;
