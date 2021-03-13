const express = require('express')
const UserAuthentication = require('../controllers/UserAuthentication')

const auth = new UserAuthentication()

const api = express.Router()

api.route('/registration').post(auth.registerUser())
api.route('/login').post(auth.loginUser())

module.exports = api
