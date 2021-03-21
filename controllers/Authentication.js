const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { JWT_SECRET } = require('../constants')

class Authentication {
  checkAuth(req, res, next) {
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

  getToken(req, res) {
    try {
      const { userId } = req

      const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '1h',
      })

      console.log(`Token issued.`)
      res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong. Try it again!' })
    }
  }

  async checkPassword(req, res, next) {
    try {
      const { userPassword, enteredPassword } = req

      const isMatch = await bcrypt.compare(enteredPassword, userPassword)
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password.' })
      }
      console.log(`Password checked.`)
      next()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong. Try it again!' })
    }
  }

  hashPassword(req, res, next) {
    try {
      const { password } = req.body

      const hashedPassword = bcrypt.hashSync(password, 12)

      console.log('Password hashed')
      req.hashedPassword = hashedPassword
      next()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong. Try it again!' })
    }
  }
}

module.exports = Authentication
