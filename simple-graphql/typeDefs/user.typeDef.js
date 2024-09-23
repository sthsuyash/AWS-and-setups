/**
 * TypeDefs or Type Definitions define the shape of the data available in the GraphQL API.
 * They specify the types of objects that can be queried and the relationships between them.
 */

const userTypeDef = `#graphql
    # User type
    # This type is used to define the structure of a user
    # ! means that the field is required
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String!
    }

    # Query type
    # This type is used to define the structure of a query, i.e., the structure of the request
    type Query {
        users: [User!]
        authUser: User
        user(userId: ID!): User
    }

    # Mutation type
    # This type is used to define the structure of a mutation,
    # i.e., the structure of the request to change the data
    type Mutation {
        register(input: RegisterInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    # Input type
    input RegisterInput {
        name: String!
        username: String!
        password: String!
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    # Response type
    type LogoutResponse {
        message: String!
    }
    
`;

export default userTypeDef;