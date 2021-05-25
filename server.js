const configureDBConnection = require('./utils/configureDBConnection')
const app = require('./app')

const port = process.env.PORT || 3000
const connectionString = process.env.DATABASE_URL

if (!connectionString) throw new Error('Database connection string missing!')

configureDBConnection(connectionString).then(async () => {
  app.listen(port, () => {
    console.log(`App running on port ${port}...`)
  })
})
