const connection = require('./connection');

const getAll = async () => {

  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;

};

const createTask = async (task) => {

  const { name } = task;
  const { email } = task;
  const dateUTC = new Date(Date.now()).toUTCString();

  query = 'INSERT INTO tasks(name, email, status, created_at) VALUES (?, ?, ?, ?)';

  const [createdTask] = await connection.execute(query, [name, email, 'ativo', dateUTC]);
  return { insertId: createdTask.insertId };

};

const deleteTask = async (id) => {

  const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return removedTask;

};

const updateTask = async (id, task) => {

  const { name, email, status } =  task;

  query = 'UPDATE tasks SET name = ?, email = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [name, email, status, id]);
  return updatedTask;

};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask
};


