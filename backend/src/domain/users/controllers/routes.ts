import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';

export async function userRoutes(app: FastifyInstance) {
    app.post('/user/create', create)
    app.put('/user/edit', edit)
}