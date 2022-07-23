const express = require('express');
const User = require("../models/user");
const router = express.Router();
const routeDebug = require('debug')('auth:route')
const authentication = require('../middleware/authentication')
const isAdmin = require('../middleware/isAdmin')

/* GET users listing. */
// api/users/
router.get('/', function (req, res) {
    res.send('respond with a resource');
});


// /api/users/signup
router.post('/signup', function (req, res) {
    let user = req.body
    User.add(user).then(token => {
            res.send(token);
        }
    ).catch(error => {
        res.status(400).send(error);
    })
});

// api/users/login
router.post('/login', function (req, res) {
    let loginInfo = req.body
    User.getToken(loginInfo).then(token => {
        res.send(token);
    }).catch(error => {
        res.status(400).send(error)
    })
});

// api/users/get-user-by-email
router.post('/get-user-by-email', authentication, function (req, res) {
    User.getUser(req.email).then(result => {
        res.send(result);
    }).catch(error => {
        res.status(400).send(error)
    })
});


// api/users/is-admin
router.post('/is-admin', isAdmin, function (req, res) {
    res.send("Admin")
});


module.exports = router;
