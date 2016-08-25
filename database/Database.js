const promise = require('bluebird');
const config  = require("../config");
const pgp     = require("pg-promise")({promiseLib: promise});

module.exports = pgp(config.database);
