const validator = require("../modules/validator");
const modelDebug = require('debug')('auth:model');
const db = require('../modules/db');
const bcrypt = require('bcrypt');
const generateJWT = require('../modules/generateJWT')

const add = user => {
    return new Promise((resolve, reject) => {
        validator.userValidator(user).then(result => {
            if (typeof result === 'object') {
                // hash -> add -> jwt
                bcrypt.hash(user.password, 10, (error, hash) => {
                    user.password = hash
                    db.addUser(user).then(result => {
                        modelDebug(`${user.email} added.`)
                        const token = generateJWT(user)
                        resolve(token)
                    }).catch(error => {
                        reject(error)
                    })
                });
            } else {
                reject(result)
            }
        })
    })
}


const getToken = loginInfo => {
    return new Promise((resolve, reject) => {
        // compare password -> jwt
        getUser(loginInfo.email).then(result => {
            bcrypt.compare(loginInfo.password, result.password).then(correctPassword => {
                if (correctPassword) {
                    const token = generateJWT(result)
                    resolve(token)
                } else {
                    reject("Incorrect password.")
                }

            })
        }).catch(error => reject(error))
    })
}

const getUser = email => {
    return new Promise((resolve, reject) => {
        db.getUser(email).then(result => {
            resolve(result)
        }).catch(error => reject(error))
    })
}

exports.add = add
exports.getToken = getToken
exports.getUser = getUser
