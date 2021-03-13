const { compose } = require('compose-middleware')
const {
  hashPassword,
} = require('../../middlewares/authentication/hashPassword.middleware')
const { createUser } = require('../../middlewares/user/createUser.middleware')
const { findUser } = require('../../middlewares/user/findUser.middleware')

const registerUser = compose([
  findUser,
  (req, res, next) => {
    try {
      const { availability } = req.foundData
      delete req.foundData

      if (availability)
        return res.status(400).json({ message: 'Such user already exists.' })

      next()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong. Try it again!' })
    }
  },
  hashPassword,
  createUser,
  (req, res) => {
    const RegMessage = `User ${req.body.email} created.`
    console.log(RegMessage)
    res.status(201).json({ message: RegMessage })
  },
])

module.exports = registerUser
