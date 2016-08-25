function App()
{
    /**
     * Application container
     * 
     * @type {DomElement}
     */
    this.container = null;

    /**
     * Array of TaskGroup
     * 
     * @type {Array.<TaskGroup>}
     */
    this.groups = [];
}

/**
 * Init application: link to the dom and prepare data
 */
App.prototype.init = function ()
{
    this.container = document.getElementById('task-container');
};

/**
 * Load group of tasks
 */
App.prototype.load = function ()
{
    // Load group of tasks
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/tasks');
    xhr.send(null);
    
    // Here we go, wait for the response
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState !== 4 || xhr.status !== 200)
            return;

        // Parse data
        var response = JSON.parse(xhr.responseText);

        // Assume one group of task for now. Next feature: allow multiple groups
        var taskGroup = new TaskGroup(1, 'My tasks');
        if (taskGroup.init(this.container))
            taskGroup.load(response.data);

        this.groups.push(taskGroup);

    }.bind(this);

    // Listen tasks events
    Socket.getInstance().on('tasks', function(data)
    {
        for (var i = 0; i < this.groups.length; i++)
        {
            if (data.groupId == this.groups[i].id)
            {
                switch(data.type)
                {
                    case 'create':
                        this.groups[i].onTaskCreated(data.taskId);
                        break;
                    case 'remove':
                        this.groups[i].onTaskRemoved(data.taskId);
                        break;
                    case 'update':
                        this.groups[i].onTaskUpdated(data.taskId, data.taskName, data.taskTag, data.taskFinished);
                        break;
                }
            }
        }
    }.bind(this));
};