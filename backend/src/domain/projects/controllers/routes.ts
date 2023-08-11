import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';

export async function projectRoutes(app: FastifyInstance) {
    app.post('/project/create', create)
    app.put('/project/edit', edit)
}