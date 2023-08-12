import { MongoUsersRepository } from "../../repositories/mongo/mongo-users-repository"
import { LikeProjectUseCase } from "../source/like-project-use-case"

export function makeLikeProjectUseCase() {
    const usersRepository = new MongoUsersRepository()
    const useCase = new LikeProjectUseCase(usersRepository)

    return useCase
}