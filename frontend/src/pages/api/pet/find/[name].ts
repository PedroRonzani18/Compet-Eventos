import { makeFindPetByNameUseCase } from '@/modules/domain/usecases/pets/factories/make-find-pet-by-name-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) { // cria um usuario

	const editPetBodySchema = z.object({
		name: z.string(),
	});

	const { name } = editPetBodySchema.parse(request.query);

	const findPetByNametUseCase = makeFindPetByNameUseCase();

	const pet = await findPetByNametUseCase.execute({ name })

	if (pet.isLeft()) return reply
		.status(400)
		.send({ message: "Pet not found." })

	return reply
		.status(201) // retorna sucesso
		.send({ pet_found: pet.value });
}

