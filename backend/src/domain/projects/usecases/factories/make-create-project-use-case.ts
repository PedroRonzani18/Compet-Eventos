import { MongoProjectsRepository } from "../../repositories/mongo/mongo-projects-repository"
import { CreateProjectUseCase } from "../source/create-project-use-case"

export function makeCreateProjectUseCase() {
    const projectsRepository = new MongoProjectsRepository()
    const useCase = new CreateProjectUseCase(projectsRepository)

    return useCase
}