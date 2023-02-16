const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ex',
    password: '12345',
    port: '3306',
});

module.exports = connection;