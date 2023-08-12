import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateUserUseCase } from '../usecases/factories/make-create-user-use-case';
import { makeFindUserByNameUseCase } from '../usecases/factories/make-find-user-by-name-use-case';

export const createUserBodySchema = z.object({ // para criar um usuario e necessario passar
	name: z.string(),
	email: z.string(),
	profile_picture: z.string().optional(),
	linkedin_url: z.string().optional(),
	github_url: z.string().optional(),
	favourite_projects: z.string().array().optional()
});

export async function create(request: FastifyRequest, reply: FastifyReply) { // cria um usuario

	const { email, favourite_projects, github_url, linkedin_url, name, profile_picture } = createUserBodySchema.parse(request.body);

	const findUserUseCase = makeFindUserByNameUseCase()

	const possibleUser = await findUserUseCase.execute({ name })

	if(possibleUser.isRight())
		return reply
			.status(400)
			.send("Proibido criar mais d eum suuario com o mesmo nome.")

	const createUserUseCase = makeCreateUserUseCase()

	const user = await createUserUseCase.execute({
		email, favourite_projects, github_url, linkedin_url, name, profile_picture
	})

	return reply
		.status(201) // retorna sucesso
		.send(user.value); // com resposta vazia, pois em criação não precisa devolver nada do db
}

