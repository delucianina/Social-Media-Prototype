const gql = String.raw;
const typeDefs = gql `

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: Date
    username: User
    reaction: [reaction]
  }

  type User {
    _id: ID
    username: String
    email: String
    thoughts: [Thought]
    friends: [User]
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

  # ----- REPURPOSE TO CREATE USER? 
  # type Mutation {
  #   registerUser(username: String!, email: String!, password: String!): RegisterUserResponse
  #   loginUser(email: String, password: String): String
  # }
`;
export default typeDefs;
