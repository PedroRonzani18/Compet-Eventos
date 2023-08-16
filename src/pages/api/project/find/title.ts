import { makeFindProjectByTitleUseCase } from '@/modules/domain/usecases/projects/factories/make-find-project-by-name-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) { // cria um usuario

	const editProjectBodySchema = z.object({
		title: z.string(),
	});

	const { title } = editProjectBodySchema.parse(request.query);

	const findProjectByTitletUseCase = makeFindProjectByTitleUseCase();

	const project = await findProjectByTitletUseCase.execute({ title })

	if (project.isLeft()) return reply
		.status(400)
		.send({ message: "Project not found." })

	return reply
		.status(201)
		.send({ project_found: project.value });
}

