const composeMiddlewares = require('../utils/composeMiddlewares')
const Authentication = require('./Authentication')
const UserModelController = require('./UserModelController')

class UserAuthentication extends Authentication {
  constructor() {
    super()
    this.user = new UserModelController()
  }

  loginUser() {
    return composeMiddlewares([
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
    return composeMiddlewares([
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
}

module.exports = UserAuthentication
