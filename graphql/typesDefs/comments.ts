// graphql/typesDefs/commentsTypeDefs.ts
import { gql } from 'apollo-server';

const commentsTypeDefs = gql`
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

export default commentsTypeDefs;
