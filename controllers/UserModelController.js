const User = require('../models/User.model')

class UserModelController {
  async createUser(req, res, next) {
    try {
      const { email } = req.body
      const user = new User({ email, password: req.hashedPassword })

      await user.save()
      next()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong. Try it again!' })
    }
  }

  async findUser(req, res, next) {
    try {
      const { email } = req.body

      const user = await User.findOne({ email })

      req.foundData = {
        availability: !!user,
        user,
      }
      next()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong. Try it again!' })
    }
  }
}

module.exports = UserModelController
