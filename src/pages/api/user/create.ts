import { makeCreateUserUseCase } from '@/modules/domain/usecases/users/factories/make-create-user-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { hash } from 'bcryptjs'
import { makeFindUserByEmailUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-email-use-case';

export const createUserBodySchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	profile_picture: z.string().optional(),
	linkedin_url: z.string().optional(),
	github_url: z.string().optional(),
	favourite_projects: z.array(z.string()).optional(),
	role: z.string().optional().default("USER"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.end(); // Method Not Allowed
	}

	const { email, favourite_projects, github_url, linkedin_url, name, profile_picture, role, password } = createUserBodySchema.parse(req.body);

	const findUserEmailUseCase = makeFindUserByEmailUseCase()

	const possibleUserWithEmail = await findUserEmailUseCase.execute({ email })

	if (possibleUserWithEmail.isRight()) {
		return res
			.status(400)
			.json({ error_message: "Proibido criar mais de um usuario com o mesmo email." });
	}

	const password_hash = await hash(password, 6)

	const createUserUseCase = makeCreateUserUseCase();

	const user = await createUserUseCase.execute({
		email,
		favourite_projects,
		github_url,
		linkedin_url,
		name,
		profile_picture,
		role,
		password_hash
	});

	return res.status(201).json({ created_user: user.value });

}
