import { MongoProjectsRepository } from "@/modules/domain/repositories/mongo/mongo-projects-repository"
import { ListAllProjectstUseCase } from "../source/list-projects-use-case"

export function makeListProjectsUseCase() {
    const projectsRepository = new MongoProjectsRepository()
    const useCase = new ListAllProjectstUseCase(projectsRepository)

    return useCase
}