const config = require('./config/config')
const restify = require('restify')
const mongoose = require('mongoose')
const restifyPlugins = require('restify-plugins')

const server = restify.createServer({
  url: config.BASE_URL,
  name: config.NAME
})

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }))
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser({ mapParams: true }))
server.use(restifyPlugins.fullResponse())

server.listen(config.PORT, () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.MONGODB_URI, { useMongoClient: true })

  const db = mongoose.connection

  db.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })

  db.once('open', () => {
    require('./routes')(server)
    console.log(`Server is listening on port ${config.PORT}...`)
  })
})
