import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindPetByNameUseCase } from '../../usecases/pets/factories/make-find-pet-by-name-use-case';
import { makeFindUserByNameUseCase } from '../../usecases/users/factories/make-find-user-by-name-use-case';
import { makeAddMemberToPetUseCase } from '../../usecases/pets/factories/make-add-member-use-case';
import { EntityAlreadyAdded } from '@/core/errors/entity-already-added-error';
import { makeCheckUserRoleUseCase } from '../../usecases/users/factories/make-check-user-role-use-case';

export async function add_member(request: FastifyRequest, reply: FastifyReply) {
    const addMemberToPetBodySchema = z.object({
        member_name: z.string(),
        pet_name: z.string(),
        creating_user: z.string()
    });

    const { member_name, pet_name, creating_user } = addMemberToPetBodySchema.parse(request.body);

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
    const foundPet = await findPetUseCase.execute({ name: pet_name })

    if (foundPet.isLeft())
        return reply
            .status(400)
            .send({ message: "Pet invalido." })

    const foundUser = await findUserUseCase.execute({ name: member_name })

    if (foundUser.isLeft())
        return reply
            .status(400)
            .send({ message: "Usuario invalido." })

    const addMemberToPetUseCase = makeAddMemberToPetUseCase();

    const addMemberToPetUseCaseResult = await addMemberToPetUseCase.execute({ member_name, pet_name });

    if (addMemberToPetUseCaseResult.isLeft()) {
        if (addMemberToPetUseCaseResult.value instanceof EntityAlreadyAdded) {
            return reply
                .status(400)
                .send({ message: "Usuario ja presente no pet em questão." })
        }
    }

    return reply
        .status(201)
        .send({ result: `User ${member_name} added to ${pet_name}`});
}
