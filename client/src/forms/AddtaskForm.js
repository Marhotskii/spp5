import React, { useState } from 'react'

const AddtaskForm = props => {
	const initialFormState = { id: null, name: '', description: '', status: ''}
	const [ task, settask ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		settask({ ...task, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!task.name || !task.description || !task.status) return

				props.addtask(task)
				settask(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={task.name} onChange={handleInputChange} />
			<label>Description</label>
			<input type="text" name="description" value={task.description} onChange={handleInputChange} />
			<label>Status</label>
			<input type="text" name="status" value={task.status} onChange={handleInputChange} />
			<button>Add new task</button>
		</form>
	)
}

export default AddtaskForm
