const knex = require('knex');
const { config } = require('./configuration.js'); 


const db = knex(config.db); 

module.exports = { db };