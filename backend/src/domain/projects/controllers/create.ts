import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateProjectUseCase } from '../usecases/factories/make-create-project-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) { // cria um usuario
	
	const createProjectBodySchema = z.object({ // para criar um usuario e necessario passar
		title: z.string(),
		author: z.string(),
		description: z.string(),
		image: z.string().nullable(),
    });

	const { author, description, image, title } = createProjectBodySchema.parse(request.body);

	const createGymUseCase = makeCreateProjectUseCase()

	const project = await createGymUseCase.execute({
		author, description, image, title
	})

	return reply
		.status(201) // retorna sucesso
		.send( project ); // com resposta vazia, pois em criação não precisa devolver nada do db
}