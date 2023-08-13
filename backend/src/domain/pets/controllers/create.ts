import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreatePetUseCase } from '../usecases/factories/make-create-pet-use-case';
import { createUserBodySchema } from '@/domain/users/controllers/create';
import { createProjectBodySchema } from '@/domain/projects/controllers/create';
import { makeFindPetByNameUseCase } from '../usecases/factories/make-find-pet-by-name-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createPetBodySchema = z.object({
		name: z.string(),
		image: z.string(),
		campus: z.string(),
		members: createUserBodySchema.array(),
		projects: createProjectBodySchema.array(),
	});

	const { campus, image, members, name, projects } = createPetBodySchema.parse(request.body);

	const findPetUseCase = makeFindPetByNameUseCase()

	const foundPet = await findPetUseCase.execute({ name })

	if (foundPet.isRight())
		return reply
			.status(400)
			.send({ message: "Proibido adicionar pets com mesmo name." })

	const createPetUseCase = makeCreatePetUseCase();

	const pet = (await createPetUseCase.execute({
		campus, members, name, projects, image
	})).value;

	return reply
		.status(201)
		.send(pet);
}
