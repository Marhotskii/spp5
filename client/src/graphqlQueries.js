export default {
    CREATE_TASK: `
      mutation CreateTask($name: String!, $description: String!, $status: String!) {
        createTask(taskInput: {name: $name, description: $description, status: $status}) {
          id
          name
          description
          status 
        }
      }
    `,
    FETCH_TASKS: `
     query {
       getTasks {   
         id
         name
         description
         status
        }     
     }
     `,
    DELETE_TASK: `
     mutation DeleteTask($id: ID!) {
       deleteTask(id: $id) {
         id   
       }
     }
   `,
    UPDATE_TASK: `
      mutation UpdateTask($id: ID!, $name: String!, $description: String!, $status: String!) {
      updateTask(id: $id, name: $name, description: $description, status: $status) {
        id
        name
        description
        status
     }
   }
  `
  };
  