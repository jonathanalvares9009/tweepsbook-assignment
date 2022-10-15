const fastify = require('fastify')({ logger: process.env.LOG_LEVEL || false });
const PORT = 5000 || process.env.PORT;

require('./connection/config.js')
fastify.register(require('./routes/user.js'))

fastify.get("/", (req, res) => {
    res.status(200).send("Server is working")
})

const start = async () => {
    try {
        await fastify.listen(8080, "0.0.0.0")
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()