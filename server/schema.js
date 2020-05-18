const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Task {
  id: Int
  name: String
  description: String
  status: String
}
input TaskInput {
  name: String!
  description: String!
  status: String!
}
input UpdateTaskInput {
  name: String!
  description: String!
  status: String!
}
type RootQuery {
  getTasks: [Task!]!
}
type RootMutation {
  createTask(taskInput: TaskInput): Task
  updateTask(id: ID!, name: String, description: String, status: String): Task
  deleteTask(id: ID!): Task
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
