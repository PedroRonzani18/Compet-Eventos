import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) { // cria um usuario

	const editUserBodySchema = z.object({
		name: z.string(),
	});

	const { name } = editUserBodySchema.parse(request.query);

	const findUserByTitletUseCase = makeFindUserByNameUseCase();

	const user = await findUserByTitletUseCase.execute({ name })

	if (user.isLeft()) return reply
		.status(400)
		.send({ message: "User not found." })

	return reply
		.status(201) // retorna sucesso
		.send({ found_user: user.value });
}

