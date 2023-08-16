import { makeDeleteUserUseCase } from '@/modules/domain/usecases/users/factories/make-delete-user-use-case';
import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) {
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
        .send({ removed_user: result.value });
}
