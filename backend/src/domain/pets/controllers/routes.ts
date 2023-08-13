import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';
import { find } from './find';
import { add_member } from './add-member';
import { deletePet } from './delete-pet';

export async function petRoutes(app: FastifyInstance) {
    app.post('/pet/create', create)
    app.put ('/pet/edit', edit)
    app.get ('/pet/find', find)
    app.put ('/pet/add-member', add_member)
    app.delete('/pet/delete', deletePet)
}