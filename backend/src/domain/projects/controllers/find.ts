import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindProjectByTitleUseCaseRequest } from '../usecases/factories/make-find-project-by-name-use-case';

export async function find(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const editProjectBodySchema = z.object({
		title: z.string(),
	});

	const { title } = editProjectBodySchema.parse(request.params);
    
	const findProjectByTitletUseCase = makeFindProjectByTitleUseCaseRequest();

	const project = (await findProjectByTitletUseCase.execute({title})).value

	if(!project) return reply
		.status(400)
		.send({message: "Project not found."})

	return reply
		.status(201) // retorna sucesso
		.send( project ); 
}

