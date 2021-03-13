const { compose } = require('compose-middleware')
const {
  checkPassword,
} = require('../../middlewares/authentication/checkPassword.middleware')
const {
  getToken,
} = require('../../middlewares/authentication/getToken.middleware')
const { findUser } = require('../../middlewares/user/findUser.middleware')

const loginUser = compose([
  findUser,
  (req, res, next) => {
    try {
      const { availability, user } = req.foundData
      delete req.foundData

      if (!availability) {
        return res.status(400).json({ message: 'Incorrect login or password.' })
      }
      req.userId = user.id
      req.enteredPassword = req.body.password
      req.userPassword = user.password
      next()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong. Try it again!' })
    }
  },
  checkPassword,
  getToken,
])

module.exports = loginUser
