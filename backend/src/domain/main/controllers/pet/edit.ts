import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { createUserBodySchema } from '../user/create';
import { createProjectBodySchema } from '../project/create';
import { makeFindPetByNameUseCase } from '../../usecases/pets/factories/make-find-pet-by-name-use-case';
import { makeEditPetUseCase } from '../../usecases/pets/factories/make-edit-pet-use-case';
import { makeFindUserByNameUseCase } from '../../usecases/users/factories/make-find-user-by-name-use-case';
import { makeCheckUserRoleUseCase } from '../../usecases/users/factories/make-check-user-role-use-case';

export async function edit(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const editPetBodySchema = z.object({
		pet_name: z.string(),
		name: z.string(),
		image: z.string(),
		campus: z.string(),
		members: createUserBodySchema.array(),
		projects: createProjectBodySchema.array(),
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

