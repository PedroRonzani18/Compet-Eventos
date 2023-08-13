import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreatePetUseCase } from '../usecases/factories/make-create-pet-use-case';
import { makeFindPetByNameUseCase } from '../usecases/factories/make-find-pet-by-name-use-case';
import { makeFindUserByNameUseCase } from '@/domain/users/usecases/factories/make-find-user-by-name-use-case';

export async function add_member(request: FastifyRequest, reply: FastifyReply) {
    const addMemberToPetBodySchema = z.object({
        member_name: z.string(),
        pet_name: z.string()
    });

    const { member_name, pet_name } = addMemberToPetBodySchema.parse(request.body);

    const findPetUseCase = makeFindPetByNameUseCase()
    const foundPet = await findPetUseCase.execute({ name: pet_name })

    if (foundPet.isLeft())
        return reply
            .status(400)
            .send({ message: "Pet invalido." })

    const findUserUseCase = makeFindUserByNameUseCase()
    const foundUser = await findUserUseCase.execute({ name: member_name })

    if (foundUser.isLeft())
        return reply
            .status(400)
            .send({ message: "Usuario invalido." })

    const addMemberToPetUseCase = makeAddMemberToPetUseCase();

    await addMemberToPetUseCase.execute({ member_name, pet_name });

    return reply
        .status(201)
        .send();
}
