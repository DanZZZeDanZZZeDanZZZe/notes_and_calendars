const User = require('../../models/User.model')

exports.createUser = async (req, res, next) => {
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
