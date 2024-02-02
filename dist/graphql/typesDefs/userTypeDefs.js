"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typedefs = (0, apollo_server_1.gql) `
type User {
    _id: ID
    email: String
    password: String
    contact: String
    role: String
    status: Boolean
}
  type Query {
        getUserById(userId: ID!): User
        getAllUsers: [User]
  }

     createUser(input: CreateUserInput!): User
        updateUser(userId: ID!, input: UpdateUserInput!): User
        deleteUser(userId: ID!): User
        signIn(email: String!, password: String!): AuthPayload  # Updated to return AuthPayload
        
        createUser(input: CreateUserInput!): User
        updateUser(userId: ID!, input: UpdateUserInput!): User
        deleteUser(userId: ID!): User
        signIn(email: String!, password: String!): AuthPayload  # Updated to return AuthPayload
        
        
    }

`;
exports.default = typedefs;
