import { createUserBodySchema } from '@/domain/users/controllers/create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeEditProjectUseCase } from '../usecases/factories/make-edit-project-use-case';
import { makeFindProjectByTitleUseCase } from '../usecases/factories/make-find-project-by-name-use-case';

export async function edit(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const editProjectBodySchema = z.object({
		project_title: z.string(),
		title: z.string().optional(),
		author: createUserBodySchema.array().optional(), // Change to array()
		description: z.string().optional(),
		image: z.string().optional(),
	});

	const { author, description, image, title, project_title } = editProjectBodySchema.parse(request.body);

	const findProjectByTitleUseCase = makeFindProjectByTitleUseCase();

	const project = await findProjectByTitleUseCase.execute({ title: project_title })

	if (project.isLeft()) return reply
		.status(400)
		.send({ message: "Project not Found for Editing." })

	const editProjectUseCase = makeEditProjectUseCase();

	const editedProject = (await editProjectUseCase.execute({
		author, description, image, title, project_title
	})).value;

	return reply
		.status(201) // retorna sucesso
		.send(editedProject);
}

