const QueryFile = require('pg-promise').QueryFile;

// Helper
function load(file)
{
    return new QueryFile(file, {minify: true});
}

// SQL
module.exports = {
    tasks:
    {
        all     : load('database/sql/tasks/all.sql'),
        create  : load('database/sql/tasks/create.sql'),
        destroy : load('database/sql/tasks/destroy.sql'),
        update  : load('database/sql/tasks/update.sql')
    },
    migrations:
    {
        tasks   : load('tasks.sql')
    }
};
