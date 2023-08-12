import { MongoProjectsRepository } from "../../repositories/mongo/mongo-projects-repository"
import { FindProjectByTitletUseCase } from "../source/find-project-by-name-use-case"

export function makeFindProjectByTitleUseCaseRequest() {
    const projectsRepository = new MongoProjectsRepository()
    const useCase = new FindProjectByTitletUseCase(projectsRepository)

    return useCase
}