import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateProjectUseCase } from '../usecases/factories/make-create-project-use-case';
import { createUserBodySchema } from '@/domain/users/controllers/create';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createProjectBodySchema = z.object({
	  title: z.string(),
	  author: createUserBodySchema.array(), // Change to array()
	  description: z.string(),
	  image: z.string(),
	});
  
	const { author, description, image, title } = createProjectBodySchema.parse( request.body );
  
	const createGymUseCase = makeCreateProjectUseCase();
  
	const project = await createGymUseCase.execute({
		author, description, image, title
	});
  
	return reply.status(201).send(project);
  }
