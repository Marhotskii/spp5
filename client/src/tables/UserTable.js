import React from 'react'

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>      
      {props.tasks.length > 0 ? (
        props.tasks.map(task => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(task)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deletetask(task.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No tasks</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable
