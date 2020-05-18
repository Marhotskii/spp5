import React, { useState, Fragment } from 'react'
import AddtaskForm from './forms/AddtaskForm'
import EdittaskForm from './forms/EdittaskForm'
import UserTable from './tables/UserTable'
import Sample from './sample'
import graphqlQueries from './graphqlQueries';


let firstInit = false;

let App = () => {

	let [ taskInfo, setUserInfo] = useState({isAuth : localStorage.getItem("token") != null, nick : localStorage.getItem("nick"), token : localStorage.getItem("token")});

	// Data
	let tasksData = [];

	if (firstInit !== true && taskInfo.isAuth){
		let requestBody = {
			query: graphqlQueries.FETCH_TASKS
		};
		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				settasks(data.data.getTasks);
			})
			firstInit = true;
		})
	}

	let initialFormState = { id: null, name: '', description: '', status: ''};

	// Setting state
	let [ tasks, settasks ] = useState(tasksData);
	let [ currenttask, setCurrenttask ] = useState(initialFormState);
	let [ editing, setEditing ] = useState(false);


	// CRUD operations
	let addtask = task => {
		task.id = tasks.length + 1;

		const requestBody = {
			query: graphqlQueries.CREATE_TASK,
			variables: {
			  name: task.name,
			  description: task.description,
			  status: task.status,
			}
		};




		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
			  'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				tasks.push(data.data.createTask);
				settasks(tasks.slice());
			})			
		})
	}

	let deletetask = id => {
		setEditing(false)

		const requestBody = {
			query: graphqlQueries.DELETE_TASK,
			variables: {
			  id: id
			}
		};

		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
			  'Content-Type': 'application/json'
			}
		}).then(() => {
			let requestBody = {
				query: graphqlQueries.FETCH_TASKS
			};

			fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				settasks(data.data.getTasks);
			})			
		})
		})
	}

	let updatetask = (id, updatedtask) => {
		setEditing(false);

		const requestBody = {
			query: graphqlQueries.UPDATE_TASK,
			variables: {
				id : id,
			  	name: updatedtask.name,
			  	description: updatedtask.description,
			  	status: updatedtask.status,
			}
		};

		fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(() => {
			let requestBody = {
				query: graphqlQueries.FETCH_TASKS
			};

			fetch('http://localhost:8080/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			response.json().then(data => {
				console.log(data.data);
				settasks(data.data.getTasks);
			})			
		})
		})
	}

	let editRow = task => {
		setEditing(true)

		setCurrenttask({ id: task.id, name: task.name, description: task.description, status: task.status })
	}

	let qw = (x) => {
		localStorage.setItem("nick", x.nick);
		localStorage.setItem("token", x.token);
		setUserInfo(x);
	}

	let OnLogOut = () => {
		localStorage.removeItem("nick");
		localStorage.removeItem("token");
		firstInit = false;
		settasks([]);
		setUserInfo({isAuth : false, nick : "", token : ""});
	}

	return (
		<div className="container">	
			<h1>ToDoist</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit task</h2>
							<EdittaskForm
								editing={editing}
								setEditing={setEditing}
								currenttask={currenttask}
								updatetask={updatetask}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add task</h2>
							<AddtaskForm addtask={addtask} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View task</h2>
					<UserTable tasks={tasks} editRow={editRow} deletetask={deletetask} />
				</div>
			</div>
		</div>
	)
}

export default App
