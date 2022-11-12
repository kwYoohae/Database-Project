const express = require('express');
const app = express();
const cors = require("cors");
const port = 3001;
require('dotenv').config();

const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(
    session({
        key: "loginData",
        secret: 'loginSecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

app.use(routes);

app.listen(port, () =>{
    console.log(`Connect at http://localhost:${port}`);
})