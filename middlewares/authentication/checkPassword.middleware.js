const bcrypt = require('bcryptjs')

exports.checkPassword = async (req, res, next) => {
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
