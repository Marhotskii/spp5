const Task  = require('./task');

async function getTasks(data) {
  const tasks = await Task.findAll();
  return tasks;
}

async function createTask(args) {
  console.log(args)
  const result = await Task.create(args.taskInput)
  console.log('result', result.dataValues);
  return result.dataValues;
}

async function updateTask(args) {
  console.log(args);
  const {id, ...data} = args;
  const task = await Task.update(data, {where: { id: id }});
  console.log('result', task.dataValues);
  return task.dataValues;
}

async function deleteTask({id}) {
  const task = await Task.destroy({where: {id: id}});
  console.log(task)
  return {id : task.id};
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
