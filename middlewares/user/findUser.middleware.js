const User = require('../../models/User.model')

exports.findUser = async (req, res, next) => {
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
