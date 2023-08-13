import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeDeleteProjectUseCase } from '../usecases/factories/make-delete-project-use-case';
import { makeFindProjectByTitleUseCase } from '../usecases/factories/make-find-project-by-name-use-case';

export async function deleteProject(request: FastifyRequest, reply: FastifyReply) {
    const createProjectBodySchema = z.object({
        title: z.string(),
    });

    const { title } = createProjectBodySchema.parse(request.body);

    const findProjectUseCase = makeFindProjectByTitleUseCase()

    const foundProject = await findProjectUseCase.execute({ title })

    if (foundProject.isLeft())
        return reply
            .status(400)
            .send({ message: "Project não encontrado para ser removido." })

    const deleteProjectUseCase = makeDeleteProjectUseCase();

    const result = await deleteProjectUseCase.execute({ name });

    return reply
        .status(201)
        .send({ removed: result.value });
}
