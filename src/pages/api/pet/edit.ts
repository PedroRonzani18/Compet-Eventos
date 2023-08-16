import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createUserBodySchema } from '../user/create';
import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { makeCheckUserRoleUseCase } from '@/modules/domain/usecases/users/factories/make-check-user-role-use-case';
import { makeFindPetByNameUseCase } from '@/modules/domain/usecases/pets/factories/make-find-pet-by-name-use-case';
import { makeEditPetUseCase } from '@/modules/domain/usecases/pets/factories/make-edit-pet-use-case';

export const editProjectBodySchema = z.object({
	title: z.string(),
	author: createUserBodySchema.array(), // Change to array()
	description: z.string(),
	image: z.string(),
	creating_user: z.string()
});

export default async function handler(request: NextApiRequest, reply: NextApiResponse) { // cria um usuario

	const editPetBodySchema = z.object({
		pet_name: z.string(),
		name: z.string(),
		image: z.string(),
		campus: z.string(),
		members: createUserBodySchema.array(),
		projects: editProjectBodySchema.array(),
		creating_user: z.string()
	});

	const { image, name, pet_name, campus, members, projects, creating_user } = editPetBodySchema.parse(request.body);

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

	const findPetByNameUseCase = makeFindPetByNameUseCase();

	const pet = await findPetByNameUseCase.execute({ name: pet_name })

	if (pet.isLeft()) return reply
		.status(400)
		.send({ message: "Pet not Found for Editing." })

	const editPetUseCase = makeEditPetUseCase();



	const editedPet = await editPetUseCase.execute({
		pet_name, campus, image, members, name, projects
	});

	return reply
		.status(201) // retorna sucesso
		.send({ result: editedPet.value });
}

