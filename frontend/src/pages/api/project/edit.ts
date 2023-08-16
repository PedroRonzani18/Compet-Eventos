import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createUserBodySchema } from '../user/create';
import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { makeCheckUserRoleUseCase } from '@/modules/domain/usecases/users/factories/make-check-user-role-use-case';
import { makeFindProjectByTitleUseCase } from '@/modules/domain/usecases/projects/factories/make-find-project-by-name-use-case';
import { makeEditProjectUseCase } from '@/modules/domain/usecases/projects/factories/make-edit-project-use-case';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) { // cria um usuario

	const editProjectBodySchema = z.object({
		project_title: z.string(),
		title: z.string().optional(),
		author: createUserBodySchema.array().optional(), // Change to array()
		description: z.string().optional(),
		image: z.string().optional(),
		creating_user: z.string()
	});

	const { author, description, image, title, project_title, creating_user } = editProjectBodySchema.parse(request.body);

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

	const findProjectByTitleUseCase = makeFindProjectByTitleUseCase();

	const project = await findProjectByTitleUseCase.execute({ title: project_title })

	if (project.isLeft()) return reply
		.status(400)
		.send({ message: "Project not Found for Editing." })

	const editProjectUseCase = makeEditProjectUseCase();

	const editedProject = await editProjectUseCase.execute({
		author, description, image, title, project_title
	});

	return reply
		.status(201) // retorna sucesso
		.send({ edited_project: editedProject.value });
}

