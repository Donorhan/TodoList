TaskManager is a simple ToDo-list in real-time.

![Preview](https://i.imgsafe.org/cf3819ca89.jpg)

CONTENTS OF THIS FILE
---------------------
 * Configuration
 * Installation
 * Architecture
 * FAQ

CONFIGURATION
------------

A configuration file (config.js) is available from the root folder, feel free to change values like the database to use and the database password.

INSTALLATION
------------
 
 * Clone (or download) the project repository then go to the project folder and install dependencies using the following command:

        npm install

 * By default the program use the default database "postgres", you can change it from the config.js file in the root folder then run the following command to migrate tables
 
        node ./database/migrations/migrate.js 

 * Everything should be ok now, the only things to do is to run the application and go to the application URL (by default: http://localhost:3000/)

        node ./app.js

ARCHITECTURE
---
### Server
The server side is based on "Express.js", "socket.io" and "nunjuncks". 
The main code is in 3 folders and 2 files:
- Controllers
- Models
- Database (migrations and SQL queries)
- app.js (application's entry point)
- routes.js (list of routes)

### Client
The client use "socket.io" only, the code can be find in the folder "./public/js".

FAQ
---

**The real time part doesn't work, why?** If you changed the socket's port from the configuration file you must update it for the client too. This value can be change in the file located at "./public/js/Socket.js".
