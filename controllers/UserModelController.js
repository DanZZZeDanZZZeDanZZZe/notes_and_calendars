const User = require('../models/User.model')
const { middlewareTools } = require('../utils/middlewareTools')

const { createMiddleware } = middlewareTools()

class UserModelController {
  createUser() {
    return async (req, res, next) => {
      const { email } = req
      const user = new User({ email, password: req.hashedPassword })

      await user.save()
      next()
    }
  }

  findUser() {
    return createMiddleware(async (req, res, next) => {
      const { email } = req
      const user = await User.findOne({ email })

      req.foundData = {
        availability: Boolean(user),
        user,
      }
      next()
    })
  }
}

module.exports = UserModelController
