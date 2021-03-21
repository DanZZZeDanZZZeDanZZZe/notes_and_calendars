const composeMiddlewares = require('../utils/composeMiddlewares')
const Authentication = require('./Authentication')
const UserModelController = require('./UserModelController')
const Validator = require('./Validator')

class UserAuthentication extends Authentication {
  constructor() {
    super()
    this.user = new UserModelController()
    this.validator = new Validator()
  }

  loginUser() {
    return composeMiddlewares([
      this.validator.processAuthenticationData(),
      (req, res, next) => {
        try {
          req.email = req.body.email
          next()
        } catch (e) {
          console.log(e)
          res
            .status(500)
            .json({ message: 'Something went wrong. Try it again!' })
        }
      },
      this.user.findUser,
      (req, res, next) => {
        try {
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
        } catch (e) {
          console.log(e)
          res
            .status(500)
            .json({ message: 'Something went wrong. Try it again!' })
        }
      },
      this.checkPassword,
      this.getToken,
    ])
  }

  registerUser() {
    //fix!!!
    return composeMiddlewares([
      this.validator.processAuthenticationData(),
      this.user.findUser,
      (req, res, next) => {
        try {
          const { availability } = req.foundData
          delete req.foundData

          if (availability)
            return res
              .status(400)
              .json({ message: 'Such user already exists.' })

          next()
        } catch (e) {
          console.log(e)
          res
            .status(500)
            .json({ message: 'Something went wrong. Try it again!' })
        }
      },
      this.hashPassword,
      this.user.createUser,
      (req, res) => {
        const RegMessage = `User ${req.body.email} created.`
        console.log(RegMessage)
        res.status(201).json({ message: RegMessage })
      },
    ])
  }

  checkAuth() {
    return composeMiddlewares([
      (req, res, next) => {
        try {
          req.email = req.params.email
          next()
        } catch (e) {
          console.log(e)
          res
            .status(500)
            .json({ message: 'Something went wrong. Try it again!' })
        }
      },
      super.checkAuth,
      this.user.findUser,
      (req, res, next) => {
        try {
          if (req.foundData.user.id === req.decoded.userId) {
            res.status(200).json({ message: 'Succes authorization' })
          } else {
            res.status(401).json({ message: 'No authorization' })
          }
        } catch (e) {
          console.log(e)
          res
            .status(500)
            .json({ message: 'Something went wrong. Try it again!' })
        }
      },
    ])
  }
}

module.exports = UserAuthentication
