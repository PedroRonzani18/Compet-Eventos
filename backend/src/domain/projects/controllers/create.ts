import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateProjectUseCase } from '../usecases/factories/make-create-project-use-case';
import { createUserBodySchema } from '@/domain/users/controllers/create';
import { makeFindProjectByTitleUseCase } from '../usecases/factories/make-find-project-by-name-use-case';

export 	const createProjectBodySchema = z.object({
	title: z.string(),
	author: createUserBodySchema.array(), // Change to array()
	description: z.string(),
	image: z.string(),
});

export async function create(request: FastifyRequest, reply: FastifyReply) {

	const { author, description, image, title } = createProjectBodySchema.parse(request.body);

	const findProjectUseCase = makeFindProjectByTitleUseCase()

	const foundProject = await findProjectUseCase.execute({ title })

	if (foundProject.isRight())
		return reply
			.status(400)
			.send({ message: "Proibido adicionar projetos com mesmo nome." })

	const createPRojectUseCase = makeCreateProjectUseCase();

	const project = (await createPRojectUseCase.execute({
		author, description, image, title
	})).value;

	return reply
		.status(201)
		.send(project);
}
