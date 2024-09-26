const departmentTypeDefs = `#graphql
  type Department {
    id: ID!
    name: String!
    employees: [Employee!]!
  }

  type Query {
    departments: [Department!]!
    department(id: ID!): Department
  }

  type Mutation {
    createDepartment(input: CreateInput!): Department!
  }

  input CreateInput {
    name: String!
  }
`;

export default departmentTypeDefs;
