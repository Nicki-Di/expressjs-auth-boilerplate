const express = require('express');
const User = require("../models/user");
const router = express.Router();
const routeDebug = require('debug')('auth:route')

/* GET users listing. */
// api/users/
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

// api/users/login
router.post('/login', function (req, res) {
    let user = req.body
    User.add(user).then(token => {
            routeDebug(token)
            res.send(token);
        }
    )

});

module.exports = router;
