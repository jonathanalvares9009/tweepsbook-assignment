const fastify = require('fastify')({ logger: process.env.LOG_LEVEL || false });
const PORT = 5000 || process.env.PORT;

require('./connection/config.js')
fastify.register(require('./routes/user.js'))

fastify.get("/", (req, res) => {
    res.status(200).send("Server is working")
})

fastify.listen(PORT, () => {
    fastify.log.info(`server listening on ${PORT}`)
})