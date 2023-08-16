import { MongoProjectsRepository } from "@/modules/domain/repositories/mongo/mongo-projects-repository"
import { EditProjectUseCase } from "../source/edit-project-use-case"

export function makeEditProjectUseCase() {
    const projectsRepository = new MongoProjectsRepository()
    const useCase = new EditProjectUseCase(projectsRepository)

    return useCase
}