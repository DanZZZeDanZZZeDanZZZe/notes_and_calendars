const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const myEnv = dotenv.config({ path: './config.env' })
dotenvExpand(myEnv)

exports.DATABASE_URL = process.env.DATABASE_URL
exports.PORT = process.env.PORT
exports.JWT_SECRET = process.env.JWT_SECRET
