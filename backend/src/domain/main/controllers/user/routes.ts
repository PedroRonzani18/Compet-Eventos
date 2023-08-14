import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';
import { like } from './like';
import { deleteUser } from './delete';
import { find } from './find';

export async function userRoutes(app: FastifyInstance) {
    app.post('/create', create)
    app.put('/edit', edit)
    app.put('/like', like)
    app.delete('/delete', deleteUser)
    app.get('/find/:name', find)
}