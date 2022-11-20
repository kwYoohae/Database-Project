const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_DATABASE,
    port: process.env.REACT_APP_DB_PORT,
    multipleStatements: true
});

module.exports = pool;