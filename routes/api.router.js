const express = require('express')
const loginUser = require('../controllers/user/loginUser.controller')
const registerUser = require('../controllers/user/registerUser.controller')

const api = express.Router()

api.route('/registration').post(registerUser)
api.route('/login').post(loginUser)

module.exports = api
