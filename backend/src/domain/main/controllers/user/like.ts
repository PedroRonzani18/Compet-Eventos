import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindUserByNameUseCase } from '../../usecases/users/factories/make-find-user-by-name-use-case';
import { makeLikeProjectUseCase } from '../../usecases/users/factories/make-like-project-use-case';

export async function like(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const likeUserBodySchema = z.object({
		user_name: z.string(),
		project_name: z.string()
	});

	const { user_name, project_name } = likeUserBodySchema.parse(request.body);

	const findUserByTitletUseCase = makeFindUserByNameUseCase();

	const user = await findUserByTitletUseCase.execute({ name: user_name })

	if (!user) return reply
		.status(400)
		.send({ message: "User not Found for Likeing." })

	const likeUserUseCase = makeLikeProjectUseCase();

	const likeUserUseCaseResult = await likeUserUseCase.execute({
		user_name, project_name
	});

	return reply
		.status(201) // retorna sucesso
		.send({project_liked: likeUserUseCaseResult.value});
}

