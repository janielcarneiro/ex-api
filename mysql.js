const mysql = require('mysql2')

const connection = mysql.createConnection({
    "connectionLimit": process.env.MYSQL_LIMIT,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});

module.exports = connection;