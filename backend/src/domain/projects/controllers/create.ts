import { FastifyReply, FastifyRequest } from 'fastify';

export async function create(request: FastifyRequest, reply: FastifyReply) { // cria um usuario
	
	return reply
		.status(201) // retorna sucesso
		.send({
			message: "yessir"
		}); // com resposta vazia, pois em criação não precisa devolver nada do db
}