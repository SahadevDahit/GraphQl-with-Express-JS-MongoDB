"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// graphql/typesDefs/commentsTypeDefs.ts
const apollo_server_1 = require("apollo-server");
const commentsTypeDefs = (0, apollo_server_1.gql) `
  type Comment {
    _id: ID
    userId: ID
    postId: ID
    content: String
    createdAt: String
    updatedAt: String
    user: user
  }

  type user {
    _id: ID
    email: String
  }
  input CreateCommentInput {
    userId: ID
    postId: ID!
    content: String!
    
  }

  input UpdateCommentInput {
    content: String
  }

  type Query {
    getCommentById(commentId: ID!): Comment
    getAllComments: [Comment]
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment
    updateComment(commentId: ID!, input: UpdateCommentInput!): Comment
    deleteComment(commentId: ID!): Comment
  }
`;
exports.default = commentsTypeDefs;
