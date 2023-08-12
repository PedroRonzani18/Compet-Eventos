import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';
import { find } from './find';

export async function projectRoutes(app: FastifyInstance) {
    app.post('/project/create', create)
    app.put ('/project/edit', edit)
    app.get ('/project/find', find)
}