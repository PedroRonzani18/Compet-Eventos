import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindUserByNameUseCase } from '../usecases/factories/make-find-user-by-name-use-case';

export async function find(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const editUserBodySchema = z.object({
		name: z.string(),
	});

	const { name } = editUserBodySchema.parse(request.params);

	const findUserByTitletUseCase = makeFindUserByNameUseCase();

	const user = await findUserByTitletUseCase.execute({ name })

	if (user.isLeft()) return reply
		.status(400)
		.send({ message: "User not found." })

	return reply
		.status(201) // retorna sucesso
		.send(user.value);
}

