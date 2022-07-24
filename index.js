const server = require('fastify')({
  logger: true
})
const cors = require('@fastify/cors')
// Declare a route
server.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})
/**register mongodb*/
require('dotenv').config()
server.register(require("@fastify/mongodb"), {
    url: process.env.MONGO_URL,
  });
 /**Register Cors */
server.register(cors, {
  origin: process.env.NODE_ENV === "production" ? /daily\.dev$/ : true,
  credentials: true,
});
/**register auth0*/
server.register(require('fastify-auth0-verify'), {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  audience: process.env.REACT_APP_AUTH0_CLIENT_ID,//or your audiance 
})
server.post('/api/auth0/register', function(instance, _options, done) {
  instance.get('/api/auth0/register', {
    handler: function(request, reply) {
      reply.send(request.user)
    },
    preValidation: instance.authenticate
  })

  done()
})
 /*remember that you should register either @fastify/jwt or fastify-auth0-jwt*/
// server.register(require('@fastify/jwt'), {
//     secret: 'supersecret'
//   })

server.register(require('./register'))
server.register(require('./registerAuth0'))
// Run the server!
server.listen({ port: process.env.SERVER_PORT }, function (err, address) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.log("Server is now listening on port "+process.env.SERVER_PORT)
})
