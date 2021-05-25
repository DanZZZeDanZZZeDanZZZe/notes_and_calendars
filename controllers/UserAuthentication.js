const { middlewareTools } = require('../utils/middlewareTools')
const Authentication = require('./Authentication')
const UserModelController = require('./UserModelController')
const Validator = require('./Validator')

const { composeMiddlewares, createMiddleware } = middlewareTools()

class UserAuthentication {
  constructor() {
    this.user = new UserModelController()
    this.validator = new Validator()
    this.auth = new Authentication()
  }

  loginUser() {
    return composeMiddlewares([
      this.validator.processAuthenticationData(),
      createMiddleware((req, res, next) => {
        req.email = req.body.email
        next()
      }),
      this.user.findUser(),
      createMiddleware((req, res, next) => {
        const { availability, user } = req.foundData
        delete req.foundData

        if (!availability) {
          return res
            .status(400)
            .json({ message: 'Incorrect login or password.' })
        }
        req.userId = user.id
        req.enteredPassword = req.body.password
        req.userPassword = user.password
        next()
      }),
      this.auth.checkPassword(),
      this.auth.getToken(),
    ])
  }

  registerUser() {
    return composeMiddlewares([
      this.validator.processAuthenticationData(),
      createMiddleware((req, res, next) => {
        req.email = req.body.email
        next()
      }),
      this.user.findUser(),
      createMiddleware((req, res, next) => {
        const { availability } = req.foundData
        delete req.foundData

        if (availability)
          return res.status(400).json({ message: 'Such user already exists.' })

        next()
      }),
      this.auth.hashPassword(),
      this.user.createUser(),
      (req, res) => {
        const RegMessage = `User ${req.body.email} created.`
        console.log(RegMessage)
        res.status(201).json({ message: RegMessage })
      },
    ])
  }

  checkAuth() {
    return composeMiddlewares([
      createMiddleware((req, res, next) => {
        req.email = req.params.email
        next()
      }),
      this.auth.checkAuth(),
      this.user.findUser(),
      createMiddleware((req, res, next) => {
        if (req.foundData.user.id === req.decoded.userId) {
          res.status(200).json({ message: 'Succes authorization' })
        } else {
          res.status(401).json({ message: 'No authorization' })
        }
      }),
    ])
  }
}

module.exports = UserAuthentication
