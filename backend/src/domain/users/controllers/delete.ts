import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeDeleteUserUseCase } from '../usecases/factories/make-delete-user-use-case';
import { makeFindUserByNameUseCase } from '../usecases/factories/make-find-user-by-name-use-case';

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string(),
    });

    const { name } = createUserBodySchema.parse(request.body);

    const findUserUseCase = makeFindUserByNameUseCase()

    const foundUser = await findUserUseCase.execute({ name })

    if (foundUser.isLeft())
        return reply
            .status(400)
            .send({ message: "User não encontrado para ser removido." })

    const deleteUserUseCase = makeDeleteUserUseCase();

    const result = await deleteUserUseCase.execute({ name });

    return reply
        .status(201)
        .send({ removed: result.value });
}
