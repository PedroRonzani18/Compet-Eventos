import { makeCreateUserUseCase } from '@/modules/domain/usecases/users/factories/make-create-user-use-case';
import { makeFindUserByNameUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-name-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export const createUserBodySchema = z.object({
	name: z.string(),
	email: z.string(),
	profile_picture: z.string().optional(),
	linkedin_url: z.string().optional(),
	github_url: z.string().optional(),
	favourite_projects: z.array(z.string()).optional(),
	role: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.end(); // Method Not Allowed
	}

	const { email, favourite_projects, github_url, linkedin_url, name, profile_picture, role, } = createUserBodySchema.parse(req.body);

	const findUserUseCase = makeFindUserByNameUseCase();

	const possibleUser = await findUserUseCase.execute({ name });

	if (possibleUser.isRight()) {
		return res
			.status(400)
			.json({ error_message: "Proibido criar mais de um usuario com o mesmo nome." });
	}

	const createUserUseCase = makeCreateUserUseCase();

	const user = await createUserUseCase.execute({
		email,
		favourite_projects,
		github_url,
		linkedin_url,
		name,
		profile_picture,
		role,
	});

	return res.status(201).json({ created_user: user.value });

}
