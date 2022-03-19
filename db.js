const mysql = require('mysql');
const dbConfig = require("./db.config.js");

const db = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
db.connect(function(err) {
    if (err) throw err;
});
// query example
db.query('SELECT * FROM users;', (error, rows) => {
    if(error) throw error;
    console.log(rows);
});
db.end();

module.exports = db;