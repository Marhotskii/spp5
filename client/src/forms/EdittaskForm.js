import React, { useState, useEffect } from 'react'

const EdittaskForm = props => {
  const [ task, settask ] = useState(props.currenttask)

  useEffect(
    () => {
      settask(props.currenttask)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    settask({ ...task, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updatetask(task.id, task)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={task.name} onChange={handleInputChange} />
      <label>Description</label>
      <input type="text" name="description" value={task.description} onChange={handleInputChange} />
      <label>Status</label>
      <input type="text" name="status" value={task.status} onChange={handleInputChange} />
      <button>Update task</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EdittaskForm
