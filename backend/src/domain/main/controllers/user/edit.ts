import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindUserByNameUseCase } from '../../usecases/users/factories/make-find-user-by-name-use-case';
import { makeEditUserUseCase } from '../../usecases/users/factories/make-edit-user-use-case';

export async function edit(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const editUserBodySchema = z.object({
		user_name: z.string(),
		name: z.string().optional(),
		email: z.string().optional(),
		profile_picture: z.string().optional(),
		linkedin_url: z.string().optional(),
		github_url: z.string().optional(),
		favourite_projects: z.string().array().optional()
	});

	const { user_name, email, favourite_projects, github_url, linkedin_url, name, profile_picture } = editUserBodySchema.parse(request.body);

	const findUserByUsertUseCase = makeFindUserByNameUseCase();

	const user = await findUserByUsertUseCase.execute({ name: user_name })

	if (!user) return reply
		.status(400)
		.send({ message: "User not Found for Editing." })

	const editUserUseCase = makeEditUserUseCase();

	const editedUser = await editUserUseCase.execute({
		user_name, email, favourite_projects, github_url, linkedin_url, name, profile_picture
	});

	return reply
		.status(201) // retorna sucesso
		.send( editedUser );
}
