const express = require("express");
const app = express();
const db = require("./modules/db");
const appDebug = require('debug')('auth:app');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require("path");
const config = require("config");

// routes
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/user');

// initialize the database
db.initDB()
db.createUsersTables()


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/', homeRouter);
app.use('/api/users', usersRouter); // for any route that starts like /api/users, use usersRouter

app.listen(config.get("port"), () => {
    appDebug(`Server started on ${config.get("port")}`)
})