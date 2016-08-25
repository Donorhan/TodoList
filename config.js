let config = {};

// Common
config.port              = 3000;

// Database
config.database          = {};
config.database.host     = "localhost";
config.database.database = "postgres";
config.database.user     = "postgres";
config.database.password = "password";
config.database.port     = 5432;
config.database.ssl      = false;

// Socket
config.socket            = {};
config.socket.port       = 8080;

module.exports = config;