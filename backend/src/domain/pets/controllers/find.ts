import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindPetByNameUseCase } from '../usecases/factories/make-find-pet-by-name-use-case';

export async function find(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const editPetBodySchema = z.object({
		name: z.string(),
	});

	const { name } = editPetBodySchema.parse(request.params);

	const findPetByNametUseCase = makeFindPetByNameUseCase();

	const pet = await findPetByNametUseCase.execute({ name })

	if (pet.isLeft()) return reply
		.status(400)
		.send({ message: "Pet not found." })

	return reply
		.status(201) // retorna sucesso
		.send(pet.value);
}

