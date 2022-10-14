const fastify = require('fastify')({ logger: true });
const PORT = 5000 || process.env.PORT;

require('./connection/config.js')
fastify.register(require('./routes/user.js'))

fastify.listen(PORT, process.env.HOST || '0.0.0.0', () => {
    console.log("Server is runing on port http://localhost:5000");
})