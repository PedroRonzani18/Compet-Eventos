import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindProjectByTitleUseCase } from '../../usecases/projects/factories/make-find-project-by-name-use-case';
import { makeDeleteProjectUseCase } from '../../usecases/projects/factories/make-delete-project-use-case';

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

    const result = await deleteProjectUseCase.execute({ title });

    return reply
        .status(201)
        .send({ removed: result.value });
}