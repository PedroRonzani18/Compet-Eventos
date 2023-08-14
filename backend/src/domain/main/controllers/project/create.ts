import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { createUserBodySchema } from '../user/create';
import { makeFindProjectByTitleUseCase } from '../../usecases/projects/factories/make-find-project-by-name-use-case';
import { makeCreateProjectUseCase } from '../../usecases/projects/factories/make-create-project-use-case';
import { makeFindUserByNameUseCase } from '../../usecases/users/factories/make-find-user-by-name-use-case';
import { makeCheckUserRoleUseCase } from '../../usecases/users/factories/make-check-user-role-use-case';

export const createProjectBodySchema = z.object({
	title: z.string(),
	author: createUserBodySchema.array(), // Change to array()
	description: z.string(),
	image: z.string(),
	creating_user: z.string()
});

export async function create(request: FastifyRequest, reply: FastifyReply) {

	const { author, description, image, title, creating_user } = createProjectBodySchema.parse(request.body);

	const findUserUseCase = makeFindUserByNameUseCase()

	const validCreatingUser = await findUserUseCase.execute({ name: creating_user })

	if (validCreatingUser.isLeft())
		return reply
			.status(400)
			.send({ message: "Usuario de criação invalido" })

	const checkUserRoleUseCase = makeCheckUserRoleUseCase()

	const roleIsEqual = await checkUserRoleUseCase.execute({ desired_role: "ADMIN", user_name: creating_user })

	console.log(roleIsEqual)

	if (roleIsEqual.isRight())
		if (!roleIsEqual.value.equal_role)
			return reply
				.status(400)
				.send({ message: "Usuario não autorizado" })

	const findProjectUseCase = makeFindProjectByTitleUseCase()

	const foundProject = await findProjectUseCase.execute({ title })

	if (foundProject.isRight())
		return reply
			.status(400)
			.send({ message: "Proibido adicionar projetos com mesmo nome." })

	const createPRojectUseCase = makeCreateProjectUseCase();

	const project = (await createPRojectUseCase.execute({
		author, description, image, title
	})).value;

	return reply
		.status(201)
		.send({ project_created: project });
}
