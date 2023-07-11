const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldName, tasksMiddleware.validateFieldEmail, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.patch('/tasks/:id', tasksMiddleware.validateFieldName, tasksMiddleware.validateFieldEmail, tasksMiddleware.validateFieldStatus, tasksController.updateTask);

module.exports = router;