import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindPetByNameUseCase } from '../usecases/factories/make-find-pet-by-name-use-case';
import { makeDeletePetUseCase } from '../usecases/factories/make-delete-pet-use-case';

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
    const createPetBodySchema = z.object({
        name: z.string(),
    });

    const { name } = createPetBodySchema.parse(request.body);

    const findPetUseCase = makeFindPetByNameUseCase()

    const foundPet = await findPetUseCase.execute({ name })

    if (foundPet.isLeft())
        return reply
            .status(400)
            .send({ message: "Pet não encontrado para ser removido." })

    const deletePetUseCase = makeDeletePetUseCase();

    const result = await deletePetUseCase.execute({ name });

    return reply
        .status(201)
        .send({ removed: result.value });
}
