import { makeFindUserByEmailUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-email-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) { // cria um usuario

	const editUserBodySchema = z.object({
		email: z.string(),
	});

	const { email } = editUserBodySchema.parse(request.query);

	const findUserByTitletUseCase = makeFindUserByEmailUseCase();

	const user = await findUserByTitletUseCase.execute({ email })

	if (user.isLeft()) return reply
		.status(400)
		.send({ message: "User not found." })

	return reply
		.status(201) // retorna sucesso
		.send({ found_user: user.value });
}

