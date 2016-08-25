const db  = require("../database/Database");
const sql = require('../database/sql/sql').tasks;

class Task
{
    /**
     * Retrieve all tasks
     *
     * @return {Promise} A promise
     */
    static all ()
    {
        return db.any(sql.all.query);
    }

    /**
     * Create a new task
     *
     * @param {string} name Task's name
     * @return {Promise} A promise
     */
    static create (name)
    {
        return db.one(sql.create.query, [name]);
    }

    /**
     * Update task with the given identifier
     *
     * @param {number} id Unique identifier
     * @param {string} name Name
     * @param {number} tag Tag
     * @param {boolean} status True to set as finished, otherwise false
     * @return {Promise} A promise
     */
    static update (id, name, tag, status)
    {
        return db.none(sql.update.query, [id, name, tag, status]);
    }

    /**
     * Remove the specified task
     *
     * @param {number} id Task identifier
     * @return {Promise} A promise
     */
    static destroy (id)
    {
        return db.none(sql.destroy.query, [id]);
    }
}

module.exports = Task;