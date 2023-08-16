import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { makeCheckUserRoleUseCase } from '@/modules/domain/usecases/users/factories/make-check-user-role-use-case';
import { makeFindPetByNameUseCase } from '@/modules/domain/usecases/pets/factories/make-find-pet-by-name-use-case';
import { UserProps } from '@/modules/domain/entities/user';
import { makeCreatePetUseCase } from '@/modules/domain/usecases/pets/factories/make-create-pet-use-case';


export default async function handler(request: NextApiRequest, reply: NextApiResponse) {
	
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
