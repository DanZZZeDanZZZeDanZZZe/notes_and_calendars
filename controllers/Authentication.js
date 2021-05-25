const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { JWT_SECRET } = require('../constants')
const { middlewareTools } = require('../utils/middlewareTools')

const { createMiddleware } = middlewareTools()

class Authentication {
  checkAuth() {
    return (req, res, next) => {
      if (req.method === 'OPTIONS') {
        return next()
      }

      const resNoAuthMessage = () =>
        res.status(401).json({ message: 'No authorization' })

      try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) resNoAuthMessage()

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.decoded = decoded
        next()
      } catch (e) {
        resNoAuthMessage()
      }
    }
  }

  getToken() {
    return createMiddleware((req, res) => {
      const { userId } = req

      const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '1h',
      })

      console.log(`Token issued.`)
      res.json({ token })
    })
  }

  checkPassword() {
    return createMiddleware(async (req, res, next) => {
      const { userPassword, enteredPassword } = req

      const isMatch = await bcrypt.compare(enteredPassword, userPassword)
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password.' })
      }
      console.log(`Password checked.`)
      next()
    })
  }

  hashPassword() {
    return createMiddleware((req, res, next) => {
      const { password } = req.body

      const hashedPassword = bcrypt.hashSync(password, 12)

      console.log('Password hashed')
      req.hashedPassword = hashedPassword
      next()
    })
  }
}

module.exports = Authentication
