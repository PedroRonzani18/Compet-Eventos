import { projectRoutes } from '@/domain/subdomain/controllers/project/routes'
import { userRoutes } from '@/domain/subdomain/application/controllers/user/routes'
import fastify from 'fastify'

export const app = fastify()

app.register(userRoutes)
app.register(projectRoutes)