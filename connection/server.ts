import { ApolloServer } from "apollo-server";
import { typeDefs } from "../graphql/typesDefs/index";
import { resolvers } from "../graphql/resolvers/index";

const server = new ApolloServer({
    typeDefs,
    resolvers,
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

export { server };
