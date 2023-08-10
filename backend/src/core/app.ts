import { projectRoutes } from '@/domain/projects/controllers/routes'
import { userRoutes } from '@/domain/users/controllers/routes'
import fastify from 'fastify'

export const app = fastify()

app.register(userRoutes)
app.register(projectRoutes)