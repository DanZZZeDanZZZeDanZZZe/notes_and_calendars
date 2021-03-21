const express = require('express')
const UserAuthentication = require('../controllers/UserAuthentication')

const auth = new UserAuthentication()

const api = express.Router()

api.route('/check/auth/:email').get(auth.checkAuth())
api.route('/registration').post(auth.registerUser())
api.route('/login').post(auth.loginUser())

module.exports = api
