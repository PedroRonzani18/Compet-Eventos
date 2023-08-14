import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindPetByNameUseCase } from '../../usecases/pets/factories/make-find-pet-by-name-use-case';
import { makeCreatePetUseCase } from '../../usecases/pets/factories/make-create-pet-use-case';
import { makeFindUserByNameUseCase } from '../../usecases/users/factories/make-find-user-by-name-use-case';
import { UserProps } from '../../entities/user';
import { makeCheckUserRoleUseCase } from '../../usecases/users/factories/make-check-user-role-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createPetBodySchema = z.object({
		creating_user: z.string(),
		name: z.string(),
		image: z.string(),
		campus: z.string(),
		members: z.array(z.string()),
	});

	const { campus, image, members, name, creating_user } = createPetBodySchema.parse(request.body);

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

	if (foundPet.isRight())
		return reply
			.status(400)
			.send({ message: "Proibido adicionar pets com mesmo name." })



	const addible_members: UserProps[] = []

	for (let i = 0; i < members.length; i++) {
		const foundMember = await findUserUseCase.execute({ name: members[i] })

		if (foundMember.isRight())
			addible_members.push(foundMember.value.user)
	}

	const createPetUseCase = makeCreatePetUseCase();

	const createPetUseCaseResult = await createPetUseCase.execute({
		campus, image, members: addible_members, name
	});

	return reply
		.status(201)
		.send({ pet_created: createPetUseCaseResult.value });
}
