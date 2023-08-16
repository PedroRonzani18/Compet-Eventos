import fastify from 'fastify';
import next from 'next';
import fastifyNextjs from 'fastify-nextjs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const server = fastify({ logger: true });

// Initialize the FastifyNextjs plugin
server.register(fastifyNextjs, {
    next,
});

const start = async () => {
    try {
        await app.prepare();
        await server.listen(3000);
        server.log.info(`Server listening on ${server.server.address().port}`);
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

start();
