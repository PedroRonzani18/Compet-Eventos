import { MongoUsersRepository } from "@/domain/main/repositories/mongo/mongo-users-repository"
import { CreateUserUseCase } from "../source/create-user-use-case"

export function makeCreateUserUseCase() {
    const usersRepository = new MongoUsersRepository()
    const useCase = new CreateUserUseCase(usersRepository)

    return useCase
}