const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../constants')

exports.getToken = async (req, res) => {
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
