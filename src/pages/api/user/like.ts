import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { makeLikeProjectUseCase } from '@/modules/domain/usecases/users/factories/make-like-project-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) { // cria um usuario

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
		.send({ project_liked: likeUserUseCaseResult.value });
}

