const gql = String.raw;

const typeDefs = gql`
  
  type Like {
        user: User
    }

  type Thought {
    _id: ID
    title: String
    body: String
    user: User
  }

  type Friend {
    _id: ID
    firstname: String
    lastname: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friends: [Friend]
    thoughts: [Thought]
  }

  type Response {
    user: User
    errors: [String]
  }

  type RegisterUserResponse {
    user: User
    errors: [String]
  }

  type Query {
    test: String
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): RegisterUserResponse
    loginUser(email: String, password: String): String
  }
`;

export default typeDefs;