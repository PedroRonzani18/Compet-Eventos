import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';
import { find } from './find';
import { deleteProject } from './delete-project';

export async function projectRoutes(app: FastifyInstance) {
    app.post('/create', create)
    app.put ('/edit', edit)
    app.get ('/find/:title', find)
    app.delete('/delete', deleteProject)
}