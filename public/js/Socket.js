function Socket()
{
    /**
     * Unique instance
     * 
     * @type {Socket}
     */
    this.socket = io.connect('http://localhost:8080');
}

/**
 * Unique instance
 * 
 * @type {Socket}
 */
Socket.instance = null;

/**
 * Get singleton instance
 * 
 * @return {Socket}
 */
Socket.getInstance = function ()
{
    if (Socket.instance === null)
      Socket.instance = new Socket();

    return Socket.instance;
};

/**
 * "Overwrite" the "on" method of socket.io
 * 
 * @param {string} name Name of the event
 * @param {function} callback Callback
 */
Socket.prototype.on = function (name, callback)
{
    this.socket.on(name, callback);
};

/**
 * Send an event
 * 
 * @param {string} name Name of the event
 * @param {Object} data Data
 */
Socket.prototype.emit = function (name, data)
{
    this.socket.emit(name, data);
};
