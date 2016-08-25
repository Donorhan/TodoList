// Instances
const express    = require('express');
const config     = require('./config');
const app        = express();
const nunjucks   = require('nunjucks');
const bodyParser = require('body-parser');
const server     = require('http').Server(app);
const io         = require('socket.io')(server);

// Configure template engine
nunjucks.configure('./views', {
  autoescape: true,
  express   : app
});

// Allow POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set "public" directory as an asset folder
app.use(express.static('public'));

// Load routes
require('./routes')(app);

// Run
app.listen(config.port);

// Socket
server.listen(config.socket.port);
io.on('connection', function(socket)
{
    socket.on('tasks', function(data)
    {
        socket.broadcast.emit('tasks', data);
    });
});