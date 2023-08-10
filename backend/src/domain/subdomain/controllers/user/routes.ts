import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';

export async function userRoutes(app: FastifyInstance) {
    app.post('/create', create)
    app.put('/edit', edit)
}