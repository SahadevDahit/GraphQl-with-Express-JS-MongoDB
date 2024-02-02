# GraphQl with Express JS /Node JS in Typescript with MongoDB: A Powerful Combination for Building Scalable APIs

---
Blog post :- https://dahit.hashnode.dev/graphql-with-express-js-node-js-in-typescript-with-mongodb-a-powerful-combination-for-building-scalable-apis

## **Features**

- JWT(JSON Web Token)  validation of user authentication with zod validation
- user can create post , comments on it with proper schema
- GraphQl has mainly two sections :
1. **TypeResolver**

T*ypeResolver in GraphQL is responsible for resolving the fields in a GraphQL query or mutation. It defines how each field should be resolved, including fetching data from the database or other sources. The TypeResolver maps the GraphQL schema to the actual data sources, enabling efficient retrieval and manipulation of data.*

1. **TypeDefs**

*TypeDefs in GraphQL define the schema and structure of the data that can be queried or mutated. It specifies the available types, fields, and their relationships. TypeDefs act as a contract between the client and server, ensuring that the data requested or provided follows the defined structure.*

For more https://graphql.org/

---

### Requirements

1. Node JS
2. MongoDB

---


---

- **package.json**

```jsx
{
  "name": "graphql-post",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rimraf dist && npx tsc",
    "prestart": "npm run build",
    "start": "node dist/index.js",
    "preserve": "npm run build",
    "serve": "concurrently \"npx tsc -w\"  \"nodemon dist/index.js\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.13",
    "apollo-server": "^3.13.0",
    "bcrypt": "^5.1.1",
    "concurrently": "^8.2.2",
    "express": "^4.18.2",
    "graphql": "^16.8.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.1.1",
    "rimraf": "^5.0.5",
    "typescript": "^5.3.3",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5"
  }
}
```



## **Steps**

1. Clone the repository

https://github.com/SahadevDahit/SahadevDahit-GraphQl-with-Express-JS-MongoDB

1. Run the following commands

```jsx
npm install
```

1. Create an  .env file and set enviroment variables as

```
JWT_KEY="secret_key"
MONGODB_URL= mongodb://localhost:27017/graphql
PORT=4000
```

1. Then

```jsx
npm run serve
```

1. Open your localhost


---

```tsx
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
        userId: ID
    }

    input UpdatePostInput {
        title: String
        description: String
        updatedAt: String
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

```

4.1 Query

*The GraphQL query language is a powerful tool for retrieving data from APIs. With GraphQL, you can specify exactly what data you need and get it in a single request, reducing over-fetching and under-fetching. It allows you to fetch multiple resources in a single query, saving network bandwidth and improving performance. Additionally, GraphQL provides a strong type system, allowing clients to know exactly what data they can request and ensuring type safety. Overall, GraphQL is a flexible and efficient solution for querying data in APIs.*

4.2 Mutations

Mutations in GraphQL are used to modify data on the server. They allow clients to create, update, or delete data by sending requests to the server. Mutations are similar to queries in syntax, but they are used for write operations instead of read operations. With mutations, clients can specify the exact changes they want to make to the data and receive the updated results. This makes GraphQL a powerful tool for managing data and ensuring consistency in APIs.

For more https://graphql.org/


