/**
 * Constructor
 * 
 * @param {TaskGroup} model Linked model
 */
function TaskGroupView(model)
{
    /**
     * Container
     * 
     * @type {DOMElement}
     */
    this.container = null;

    /**
     * Linked model
     * 
     * @type {TaskGroup}
     */
    this.model = model;

    /**
     * Progression container to show task finished
     * 
     * @type {DOMElement}
     */
    this.progressionContainer = null;

    /**
     * Task container
     * 
     * @type {DOMElement}
     */
    this.taskContainer = null;
}

/**
 * Tags colors availables
 * 
 * @type {Array.<string>}
 */
TaskGroupView.TagColors = ['none', 'tag-orange', 'tag-green', 'tag-pink', 'tag-purple', 'tag-blue'];

/**
 * Create a new group of task
 * 
 * @param {DOMElement} container Parent element
 * @return {boolean} True if everything was successful
 */
TaskGroupView.prototype.create = function (container)
{
    // Main div
    var div = document.createElement('div');
    div.className = 'task-container';
    this.container = div;

    // Header div
    {
        var headerDiv = document.createElement('div');

        var progressionDiv = document.createElement('div');
        progressionDiv.className = 'progression';
        progressionDiv.textContent = '0 / 0';
        headerDiv.appendChild(progressionDiv);
        this.progressionContainer = progressionDiv;

        var titleInput = document.createElement('input');
        titleInput.className = 'task-group-title';
        titleInput.value = this.model.name;
        headerDiv.appendChild(titleInput);

        div.appendChild(headerDiv);
    }

    // Task list
    var taskList = document.createElement('ul');
    div.appendChild(taskList);
    this.taskContainer = taskList;

    // Add button
    {
        var addButton = document.createElement('button');
        addButton.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i> Create a new task';
        addButton.onclick = function ()
        {
            this.model.createTask("");
        }.bind(this);
        div.appendChild(addButton);
    }

    // Finally add to the DOM
    container.appendChild(div);

    return true;
};

/**
 * Create a new task
 *
 * @param {number} id The task identifier
 * @param {string} name The name
 * @param {number} tag The tag
 * @param {boolean} finished True to set as finished
 * @param {boolean} animate True to animate, otherwise false
 */
TaskGroupView.prototype.createTask = function(id, name, tag, finished, animate)
{
    // Main div
    var li = document.createElement('li');
    li.id = 'task-' + id;
    li.className = (tag < TaskGroupView.TagColors.length) ? TaskGroupView.TagColors[tag] : TaskGroupView.TagColors[0];
    li.dataset.id = id;

    var statusCheckBox = document.createElement('input');
    statusCheckBox.type = 'checkbox';
    statusCheckBox.checked = finished;
    statusCheckBox.onclick = function (event)
    {
        var parent = event.target.parentElement;
        this.model.updateTask(parent.dataset.id, parent.children[1].value, 0, parent.children[0].checked);
    }.bind(this);
    li.appendChild(statusCheckBox);

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = name;
    nameInput.onblur = function (event)
    {
        var parent = event.target.parentElement;
        this.model.updateTask(parent.dataset.id, parent.children[1].value, 0, parent.children[0].checked);
    }.bind(this);
    li.appendChild(nameInput);

    var removeButton = document.createElement('i');
    removeButton.className = 'fa fa-times';
    removeButton.onclick = function (event)
    {
        this.model.removeTask(event.target.parentElement.dataset.id);
    }.bind(this);
    li.appendChild(removeButton);

    // Animate?
    if (animate)
    {
        li.className += ' fadeIn';
        setTimeout(function()
        {
            li.className = "";
            nameInput.focus();
        }.bind(this), 0);
    }

    this.taskContainer.appendChild(li);
};

/**
 * Remove a task
 *
 * @param {number} id The task identifier
 */
TaskGroupView.prototype.removeTask = function(id)
{
    var task = document.getElementById('task-' + id);
    if (!task)
        return;

    this.taskContainer.removeChild(task);
};

/**
 * Update a task
 *
 * @param {number} id The task identifier
 * @param {string} name Task name
 * @param {number} tag Task tag
 * @param {string} finished_at Task status
 */
TaskGroupView.prototype.updateTask = function(id, name, tag, finished_at)
{
    var task = document.getElementById('task-' + id);
    if (!task)
        return;

    task.className = (tag < TaskGroupView.TagColors.length) ? TaskGroupView.TagColors[tag] : TaskGroupView.TagColors[0];
    task.children[0].checked = (finished_at !== null);
    task.children[1].value = name;
};

/**
 * Update progression indicator
 *
 * @param {number} taskFinishedCount Amount of task finished
 * @param {number} taskCount Task count
 */
TaskGroupView.prototype.updateProgression = function(taskFinishedCount, taskCount)
{
    this.progressionContainer.innerHTML = taskFinishedCount + ' / ' + taskCount;
};
