// Require the framework and instantiate it
import fastifyFactory from 'fastify';
// const fastify = require('fastify')({ logger: true })

const fastify = fastifyFactory({
    logger: true,
});

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

fastify.get('/favicon.ico', async (request, reply) => {
    reply.code(500);
    return 'No favicon here';
});

fastify.post('/api/bw', async (request, reply) => {
    return {
        hi: 'there',
    };
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
