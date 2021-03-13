const bcrypt = require('bcryptjs')

exports.hashPassword = async (req, res, next) => {
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
