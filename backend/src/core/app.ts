import { petRoutes } from '@/domain/main/controllers/pet/routes'
import { projectRoutes } from '@/domain/main/controllers/project/routes'
import { userRoutes } from '@/domain/main/controllers/user/routes'
import fastify from 'fastify'

export const app = fastify()

app.register(userRoutes, {prefix: 'user'})
app.register(projectRoutes, {prefix: 'project'})
app.register(petRoutes, {prefix: 'pet'}) 