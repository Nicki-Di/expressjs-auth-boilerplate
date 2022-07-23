const validator = require("../modules/validator");
const modelDebug = require('debug')('auth:model');
const db = require('../modules/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const generateJWT = require('../modules/generateJWT')

const add = user => {
    return new Promise((resolve, reject) => {
        validator.userValidator(user).then(result1 => {
            if (typeof result1 === 'object') {
                // check if the user is new
                // if new: hash -> add -> jwt
                // else: compare password -> jwt

                db.getUser(user).then(result2 => {
                    if (_.isEmpty(result2)) {
                        // hash -> add -> jwt
                        bcrypt.hash(user.password, 10, (error1, hash) => {
                            user.password = hash
                            db.addUser(user).then(result3 => {
                                modelDebug(`${JSON.stringify(user, null, '\t')} added.`)
                                const token = generateJWT(user)
                                resolve(token)
                            })
                        });
                    } else {
                        // compare password -> jwt 
                        bcrypt.compare(user.password, result2.password).then(correctPassword => {
                            if (correctPassword) {
                                modelDebug(`${JSON.stringify(user, null, '\t')} already registered.`)
                                const token = generateJWT(user)
                                resolve(token)
                            } else {
                                resolve("Incorrect password")
                            }

                        })
                    }

                }).catch(error2 => reject(error2))

            } else {
                modelDebug(result1)
                reject(result1)
            }
        })
    })

}

exports.add = add
