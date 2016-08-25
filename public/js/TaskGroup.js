/**
 * Group constructor
 *
 * @param {number} id The identifier
 * @param {string} name Name
 */
function TaskGroup(id, name)
{
    /**
     * Identifier
     * 
     * @type {number}
     */
     this.id = id;

    /**
     * Name
     * 
     * @type {string}
     */
     this.name = name;

    /**
     * Tasks
     * 
     * @type {Array.<Object>}
     */
    this.tasks = [];

    /**
     * The view
     * 
     * @type {TaskGroupView}
     */
    this.view = new TaskGroupView(this);
}

/**
 * Init
 * 
 * @param {DomElement} container Container/Parent element
 * @return {boolean} True if everything was successful, otherwise false
 */
TaskGroup.prototype.init = function (container)
{
    return this.view.create(container, this);
};

/**
 * Load tasks from an array
 *
 * @param {Array.<Object} tasks The tasks
 */
TaskGroup.prototype.load = function(tasks)
{
    // Load tasks
    this.tasks = tasks;

    // Create views
    for (var i = 0; i < tasks.length; i++)
        this.view.createTask(tasks[i].id, tasks[i].name, tasks[i].tag, (tasks[i].finished_at !== null), false);

    // Update progression view
    this.view.updateProgression(this.countFinishedTasks(), this.tasks.length);
};

/**
 * Create a new task
 *
 * @param {string} name The name
 */
TaskGroup.prototype.createTask = function(name)
{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/tasks');
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify({ name: name }));

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState !== 4 || xhr.status !== 201)
            return;

        // Notify other clients
        var response = JSON.parse(xhr.responseText);
        Socket.getInstance().emit("tasks", {groupId: this.id, type: 'create', taskId: response.data.id});

        // Add to the DOM
        this.onTaskCreated(response.data.id);

    }.bind(this);
};

/**
 * Remove a given task
 *
 * @param {number} id Task identifier
 */
TaskGroup.prototype.removeTask = function(id)
{
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/tasks');
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify({ id: id }));

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState !== 4 || xhr.status !== 200)
            return;

        // Notify other clients
        Socket.getInstance().emit("tasks", {groupId: this.id, type: 'remove', taskId: id});

        // Remove from the DOM
        var response = JSON.parse(xhr.responseText);
        this.onTaskRemoved(id);
    }.bind(this);
};

/**
 * Update a task
 *
 * @param {number} id Task identifier
 * @param {string} name The name
 * @param {number} tag The tag
 * @param {boolean} finished True to set as finished, otherwise false
 */
TaskGroup.prototype.updateTask = function(id, name, tag, finished)
{
    var params = JSON.stringify({ id: id, name: name, tag: tag, finished: finished });

    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', '/tasks');
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(params);

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState !== 4 || xhr.status !== 200)
            return;

        // Notify other clients
        finished = finished ? new Date().getTime() : null;
        Socket.getInstance().emit("tasks", {groupId: this.id, type: 'update', taskId: id, taskName: name, taskTag: tag, taskFinished: finished});

        // Update the DOM element
        this.onTaskUpdated(id, name, tag, finished);
    }.bind(this);
};

/**
 * Call when a task is created
 *
 * @param {number} id Task identifier
 * @private
 */
TaskGroup.prototype.onTaskCreated = function(id)
{
    this.tasks.push({id: id, name: '', tag: 0, created_at: null, finished_at: null, deleted_at: null});
    this.view.createTask(id, name, 0, false, true);
    this.view.updateProgression(this.countFinishedTasks(), this.tasks.length);
};

/**
 * Call when a task is removed
 *
 * @param {number} id Task identifier
 * @private
 */
TaskGroup.prototype.onTaskRemoved = function(id)
{
    // Remove model
    var index = this.findTaskIndex(id);
    if (index !== -1)
        this.tasks.splice(index, 1);

    // Update view
    this.view.removeTask(id);
    this.view.updateProgression(this.countFinishedTasks(), this.tasks.length);
};

/**
 * Call when a task is updated
 *
 * @param {number} id Task identifier
 * @param {string} name Task name
 * @param {number} tag Task tag
 * @param {string} finished_at Task status
 * @private
 */
TaskGroup.prototype.onTaskUpdated = function(id, name, tag, finished_at)
{
    // Update model
    var index = this.findTaskIndex(id);
    if (index !== -1)
    {
        this.tasks[index].name = name;
        this.tasks[index].tag = tag;
        this.tasks[index].finished_at = finished_at;
    }

    // Update view
    this.view.updateTask(id, name, tag, finished_at);
    this.view.updateProgression(this.countFinishedTasks(), this.tasks.length);
};

/**
 * Count task finished
 *
 * @return {number} A positive integer
 */
TaskGroup.prototype.countFinishedTasks = function()
{
    var count = 0;
    for (var i = 0; i < this.tasks.length; i++)
        count += (this.tasks[i].finished_at !== null) ? 1 : 0;

    return count;
};


/**
 * Find a task using his identifier
 *
 * @param {number} id Task identifier
 * @return {number} An integer, -1 when the task has not been found
 */
TaskGroup.prototype.findTaskIndex = function(id)
{
    var index = -1;
    for (var i = 0; i < this.tasks.length; i++)
        if (this.tasks[i].id == id)
            index = i;

    return index;
};

