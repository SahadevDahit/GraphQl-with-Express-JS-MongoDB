// typesDefs/postTypesDefs.ts
import { gql } from 'apollo-server';

const postTypeDefs = gql`
    type Post {
        _id: ID
        title: String
        description: String
        createdAt: String
        user: UserNested
      }

     type UserNested {
         _id: ID
         email: String
       
 }

    input CreatePostInput {
        title: String!
        description: String!
        userId:ID
    }

    input UpdatePostInput {
        title: String
        description: String
        updatedAt:String
    }

    type Query {
        getPostById(postId: ID!): Post
        getAllPosts: [Post]
    }

    type Mutation {
        createPost(input: CreatePostInput!): Post
        updatePost(postId: ID!, input: UpdatePostInput!): Post
        deletePost(postId: ID!): Post
    }
`;

export default postTypeDefs;
