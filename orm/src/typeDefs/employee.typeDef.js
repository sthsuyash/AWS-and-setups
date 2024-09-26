const employeeTypeDef = `#graphql
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    department: Department
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(input: CreateEmployee!): Employee!
    assignDepartment(employeeId: ID!, departmentId: ID!): Employee!
  }

  input CreateEmployee {
    firstName: String!
    lastName: String!
    email: String!
    departmentId: ID
  }
`;

export default employeeTypeDef;
