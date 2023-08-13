import { MongoProjectsRepository } from "@/domain/main/repositories/mongo/mongo-projects-repository"
import { FindProjectByTitletUseCase } from "../source/find-project-by-name-use-case"

export function makeFindProjectByTitleUseCase() {
    const projectsRepository = new MongoProjectsRepository()
    const useCase = new FindProjectByTitletUseCase(projectsRepository)

    return useCase
}