import { makeListProjectsUseCase } from '@/modules/domain/usecases/projects/factories/make-list-projects-use-case';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, reply: NextApiResponse) {
	
	if (request.method !== 'GET') {
		return reply
			.status(405)
			.end(); // Method Not Allowed
	}


	const listProjectsUseCase = makeListProjectsUseCase()

	const projects = await listProjectsUseCase.execute()

	if (projects.value?.projects.length === 0)
		return reply
			.status(400)
			.json({ message: "Nenhum projeto cadastrado" })

	return reply
		.status(201)
		.json({ projects });
}
