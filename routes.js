module.exports = function (app)
{
    // Dependencies
    const express         = require("express");
    const router          = express.Router();
    const tasksController = require('./controllers/TasksController');

    // Tasks
    router.get('/', tasksController.show);
    router.get('/tasks', tasksController.all);
    router.post('/tasks', tasksController.create);
    router.patch('/tasks', tasksController.update);
    router.delete('/tasks', tasksController.destroy);

    app.use('/', router);
};