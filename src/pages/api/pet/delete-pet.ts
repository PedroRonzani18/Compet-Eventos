import { makeDeletePetUseCase } from '@/modules/domain/usecases/pets/factories/make-delete-pet-use-case';
import { makeFindPetByNameUseCase } from '@/modules/domain/usecases/pets/factories/make-find-pet-by-name-use-case';
import { makeCheckUserRoleUseCase } from '@/modules/domain/usecases/users/factories/make-check-user-role-use-case';
import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) {
    
    const createPetBodySchema = z.object({
        name: z.string(),
        creating_user: z.string()
    });

    const { name, creating_user } = createPetBodySchema.parse(request.body);

    const findUserUseCase = makeFindUserByNameUseCase()

    const validCreatingUser = await findUserUseCase.execute({ name: creating_user })

    if (validCreatingUser.isLeft())
        return reply
            .status(400)
            .send({ message: "Usuario de criação invalido" })

    const checkUserRoleUseCase = makeCheckUserRoleUseCase()

    const roleIsEqual = await checkUserRoleUseCase.execute({ desired_role: "ADMIN", user_name: creating_user })

    console.log(roleIsEqual)

    if (roleIsEqual.isRight())
        if (!roleIsEqual.value.equal_role)
            return reply
                .status(400)
                .send({ message: "Usuario não autorizado" })

    const findPetUseCase = makeFindPetByNameUseCase()

    const foundPet = await findPetUseCase.execute({ name })

    if (foundPet.isLeft())
        return reply
            .status(400)
            .send({ message: "Pet não encontrado para ser removido." })

    const deletePetUseCase = makeDeletePetUseCase();

    const result = await deletePetUseCase.execute({ name });

    return reply
        .status(201)
        .send({ removed: result.value });
}
