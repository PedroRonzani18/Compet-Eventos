import { makeFindUserByEmailUseCase } from '@/modules/domain/usecases/users/factories/make-find-user-by-email-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { hash, compare } from 'bcryptjs'

export const createUserBodySchema = z.object({
    email: z.string(),
    password: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res
            .status(405)
            .end(); // Method Not Allowed
    }

    const { email, password } = createUserBodySchema.parse(req.body);

    const findUserUseCase = makeFindUserByEmailUseCase();

    const possibleUser = await findUserUseCase.execute({ email });

    if (possibleUser.isLeft())
        return res
            .status(400)
            .json({ error_message: "Email e/ou senha inválido(s)." });

    if (!compare(password, possibleUser.value.user.password_hash))
        return res
            .status(400)
            .json({ error_message: "Email e/ou senha inválido(s)." });

    return res.status(201).json({
        name: possibleUser.value.user.name,
        email: possibleUser.value.user.email,
        role: possibleUser.value.user.role
    });

}
