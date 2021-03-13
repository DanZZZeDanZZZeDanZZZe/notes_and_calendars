const { validationResult, check } = require('express-validator')
const composeMiddlewares = require('../utils/composeMiddlewares')

class Validator {
  createResult() {
    return (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const message = 'Incorrect data'
        console.log(message)
        return res.status(400).json({
          errors: errors.array(),
          message,
        })
      }
      next()
    }
  }

  processEmail(field = 'email') {
    return check(field).trim().normalizeEmail().isEmail()
  }

  processPassword(field = 'password') {
    return check(field).trim().isLength({ min: 10, max: 50 })
  }

  processAuthenticationData() {
    return composeMiddlewares([
      this.processEmail(),
      this.processPassword(),
      this.createResult(),
    ])
  }
}

module.exports = Validator