import { MongoProjectsRepository } from "@/modules/domain/repositories/mongo/mongo-projects-repository"
import { DeleteProjectUseCase } from "../source/delete-project-use-case"

export function makeDeleteProjectUseCase() {
    const projectsRepository = new MongoProjectsRepository()
    const useCase = new DeleteProjectUseCase(projectsRepository)

    return useCase
}