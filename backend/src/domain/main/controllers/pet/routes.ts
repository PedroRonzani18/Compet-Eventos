import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';
import { find } from './find';
import { add_member } from './add-member';
import { deletePet } from './delete-pet';

export async function petRoutes(app: FastifyInstance) {
    app.post('/create', create)
    app.put ('/edit', edit)
    app.get ('/find/:name', find)
    app.put ('/add-member', add_member)
    app.delete('/delete',deletePet)
}