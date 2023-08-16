import { makeDeleteProjectUseCase } from '@/modules/domain/usecases/projects/factories/make-delete-project-use-case';
import { makeFindProjectByTitleUseCase } from '@/modules/domain/usecases/projects/factories/make-find-project-by-name-use-case';
import { makeCheckUserRoleUseCase } from '@/modules/domain/usecases/users/factories/make-check-user-role-use-case';
import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) {
    const createProjectBodySchema = z.object({
        title: z.string(),
        creating_user: z.string()
    });

    const { title, creating_user } = createProjectBodySchema.parse(request.body);

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
