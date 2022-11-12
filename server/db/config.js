const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_DATABASE,
    port: process.env.REACT_APP_DB_PORT
})

db.connect((error, result) => {
    if(error)
        console.log(error);
});

module.exports = db;