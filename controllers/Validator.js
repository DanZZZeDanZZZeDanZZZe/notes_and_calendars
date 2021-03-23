const { validationResult, check } = require('express-validator')
const { middlewareTools } = require('../utils/middlewareTools')

const { composeMiddlewares } = middlewareTools()

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
      console.log('Data was processed')
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
