import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';
import { like } from './like';

export async function userRoutes(app: FastifyInstance) {
    app.post('/user/create', create)
    app.put('/user/edit', edit)
    app.put('/user/like', like)
}