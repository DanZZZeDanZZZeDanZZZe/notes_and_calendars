const mongoose = require('mongoose')

function configureDBConnection(connectionString) {
  return mongoose.connect(connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = configureDBConnection
