import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function testing(request: FastifyRequest, reply: FastifyReply) { // cria um usuario
	
	const createUserBodySchema = z.object({ // para criar um usuario e necessario passar
		email: z.string(),
    });

	const { email } = createUserBodySchema.parse(request.body);

	return reply
		.status(201) // retorna sucesso
		.send( {message: "DOS GURI", email: email} ); // com resposta vazia, pois em criação não precisa devolver nada do db
}