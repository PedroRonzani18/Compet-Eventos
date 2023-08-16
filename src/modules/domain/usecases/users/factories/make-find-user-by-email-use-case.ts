import { MongoUsersRepository } from "@/modules/domain/repositories/mongo/mongo-users-repository"
import { FindUserByEmailtUseCase } from "../source/find-user-by-email-use-case"

export function makeFindUserByEmailUseCase() {
    const usersRepository = new MongoUsersRepository()
    const useCase = new FindUserByEmailtUseCase(usersRepository)

    return useCase
}