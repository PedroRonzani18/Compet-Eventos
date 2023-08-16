import { MongoUsersRepository } from "@/modules/domain/repositories/mongo/mongo-users-repository"
import { FindUserByNametUseCase } from "../source/find-user-by-name-use-case"

export function makeFindUserByNameUseCase() {
    const usersRepository = new MongoUsersRepository()
    const useCase = new FindUserByNametUseCase(usersRepository)

    return useCase
}