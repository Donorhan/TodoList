const db  = require("../Database");
const sql = require('../sql/sql');

for (let migration in sql.migrations) {
	db.none(sql.migrations[migration].query);
}
