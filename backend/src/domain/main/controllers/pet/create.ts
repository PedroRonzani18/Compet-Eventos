import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { createUserBodySchema } from '../user/create';
import { createProjectBodySchema } from '../project/create';
import { makeFindPetByNameUseCase } from '../../usecases/pets/factories/make-find-pet-by-name-use-case';
import { makeCreatePetUseCase } from '../../usecases/pets/factories/make-create-pet-use-case';

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

	const createPetUseCaseResult = await createPetUseCase.execute({
		campus, members, name, projects, image
	});

	return reply
		.status(201)
		.send({ pet_created: createPetUseCaseResult.value });
}
