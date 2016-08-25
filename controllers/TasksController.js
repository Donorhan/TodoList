const Task = require("../models/Task");

class TasksController
{
    /**
     * Show tasks page
     *
     * @param {HTTPRequest} A request object
     * @param {HTTPResponse} A response object
     * @return {string} A HTML formatted view
     */
    show (req, res)
    {
        res.render('tasks.html');
    }

    /**
     * Retrieve all tasks
     *
     * @param {HTTPRequest} A request object
     * @param {HTTPResponse} A response object
     * @return {string} A JSON formatted string
     */
    all (req, res)
    {
        Task.all().then(function (data)
        {
            res.status(200).json({
                  status    : 'success',
                  data      : data,
                  message   : 'Task successfully loaded'
            });
        })
        .catch(function (err)
        {
            res.status(500).json({
                  status    : 'failed',
                  data      : err,
                  message   : 'An error occured during loading'
            });
        });
    }

    /**
     * Create a new task
     *
     * @param {HTTPRequest} A request object
     * @param {HTTPResponse} A response object
     * @return {string} A JSON formatted string
     */
    create (req, res)
    {
        const taskName = req.body.name;

        Task.create(taskName).then(function (data)
        {
            res.status(201).json({
                  status    : 'success',
                  data      : {id: data.id, name: taskName},
                  message   : 'Task successfully created'
            });
        })
        .catch(function (err)
        {
            res.status(500).json({
                  status    : 'failed',
                  data      : err,
                  message   : 'An error occured during task creation'
            });
        });
    }

    /**
     * Update a specified task
     *
     * @param {HTTPRequest} A request object
     * @param {HTTPResponse} A response object
     * @return {string} A JSON formatted string
     */
    update (req, res)
    {
        const taskId   = req.body.id;
        const taskName = req.body.name;
        const taskTag  = req.body.tag;
        const finished = req.body.finished;

        Task.update(taskId, taskName, taskTag, finished).then(function (data)
        {
            res.status(200).json({
                  status    : 'success',
                  data      : data,
                  message   : 'Task successfully updated'
            });
        })
        .catch(function (err)
        {
            res.status(500).json({
                  status    : 'failed',
                  data      : err,
                  message   : 'An error occured during task update'
            });
        });
    }

    /**
     * Remove the specified task
     *
     * @param {HTTPRequest} A request object
     * @param {HTTPResponse} A response object
     * @return {string} A JSON formatted string
     */
    destroy (req, res)
    {
        const taskId   = req.body.id;

        Task.destroy(taskId).then(function (data)
        {
            res.status(200).json({
                  status    : 'success',
                  data      : [],
                  message   : 'Task successfully removed'
            });
        })
        .catch(function (err)
        {
            res.status(500).json({
                  status    : 'failed',
                  data      : err,
                  message   : 'Unable to destroy the task'
            });
        });
    }
}

module.exports = new TasksController();