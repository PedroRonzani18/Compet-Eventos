import { createUserBodySchema } from '@/domain/users/controllers/create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindPetByNameUseCase } from '../usecases/factories/make-find-pet-by-name-use-case';
import { makeEditPetUseCase } from '../usecases/factories/make-edit-pet-use-case';
import { createProjectBodySchema } from '@/domain/projects/controllers/create';

export async function edit(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const editPetBodySchema = z.object({
		pet_name: z.string(),
		name: z.string(),
		image: z.string(),
		campus: z.string(),
		members: createUserBodySchema.array(),
		projects: createProjectBodySchema.array()
	});

	const { image, name, pet_name, campus, members, projects } = editPetBodySchema.parse(request.body);

	const findPetByNameUseCase = makeFindPetByNameUseCase();

	const pet = await findPetByNameUseCase.execute({ name: pet_name })

	if (pet.isLeft()) return reply
		.status(400)
		.send({ message: "Pet not Found for Editing." })

	const editPetUseCase = makeEditPetUseCase();

	const editedPet = (await editPetUseCase.execute({
		pet_name, campus, image, members, name, projects
	})).value;

	return reply
		.status(201) // retorna sucesso
		.send(editedPet);
}

