const Fastify = require('fastify')
const next = require('next')

// prepare next app
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
const nextHandle = nextApp.getRequestHandler()
nextApp.prepare()
  .then(async () => {
    // prepare fastify
    const fastify = Fastify({
      logger: true,
    })

    fastify.all('*', (req, reply) => nextHandle(req.raw, reply.raw))

    fastify.setNotFoundHandler((req, reply) =>
      nextApp.render404(req.raw, reply.raw),
    )

    const PORT = 3000
    try {
      await fastify.listen({ port: PORT })
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
