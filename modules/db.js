const mysql = require('mysql');
const config = require("config");
const dbDebug = require('debug')('auth:db');

let connection = mysql.createConnection({
    host: config.get("db.host"),
    user: config.get("db.user"),
    password: config.get("db.password"),
    multipleStatements: true
});

const initDB = () => {
    connection.connect(error => {
        error ? dbDebug(error.message) : dbDebug("Connection ok.")
    });
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.get("db.database_name")}; USE ${config.get("db.database_name")}`, error => {
        error ? dbDebug(error.message) : dbDebug("Database ok.");
    });
}

const createUsersTables = () => {
    let usersTable = `CREATE TABLE IF NOT EXISTS Users(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255) ,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        role VARCHAR(255) NOT NULL
                        );`
    connection.query(usersTable, error => {
        error ? dbDebug(error.message) : dbDebug("Users Table ok.")

    });
}

const addUser = user => {
    let query = `INSERT INTO Users (name, email, password, role) VALUES ("${user.name}", "${user.email}", "${user.password}", "normal");`

    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) return reject(error.message)
            else return resolve(result)
        })
    })
}

const getUser = email => {
    let query = `SELECT * FROM Users WHERE email = "${email}";`
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                reject(error.message)
            } else {
                if (result.length > 0) {
                    resolve(result[0])
                } else {
                    reject("No such user found.")
                }
            }
        })
    })
}

exports.initDB = initDB;
exports.createUsersTables = createUsersTables;
exports.addUser = addUser;
exports.getUser = getUser;