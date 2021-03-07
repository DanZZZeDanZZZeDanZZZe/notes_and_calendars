const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  const resNoAuthMessage = () =>
    res.status(401).json({ message: 'No authorization' })

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) resNoAuthMessage()

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (e) {
    resNoAuthMessage()
  }
}
