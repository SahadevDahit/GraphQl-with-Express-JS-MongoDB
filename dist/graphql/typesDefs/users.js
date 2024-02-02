"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typedefs = (0, apollo_server_1.gql) `
      type Post {
        _id: ID
        title: String
        description: String
        createdAt: String
        userId:ID
        user: UserNested
       
    }

     type UserNested {
         _id: ID
        email: String
    }
      
    type User {
        _id:ID
        email: String
        password: String
        contact: String
        role: String
        status: Boolean
    }


    input CreateUserInput {
        email: String!
        password: String!
        contact: String!
        role: String
        status: Boolean
    }

    input UpdateUserInput {
        email: String
        password: String
        contact: String
        role: String
        status: Boolean
    }

    type AuthPayload {
        user: User
        token: String
    }

    type Query {
        getUserById(userId: ID!): User
        getAllUsers: [User]
    }

    type Mutation {
        
        createUser(input: CreateUserInput!): User
        updateUser(userId: ID!, input: UpdateUserInput!): User
        deleteUser(userId: ID!): User
        signIn(email: String!, password: String!): AuthPayload  # Updated to return AuthPayload
        
    }
`;
exports.default = typedefs;
