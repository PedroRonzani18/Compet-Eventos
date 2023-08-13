import { MongoUsersRepository } from "../../repositories/mongo/mongo-users-repository"
import { DeleteUserUseCase } from "../source/delete-user-use-case"

export function makeDeleteUserUseCase() {
    const usersRepository = new MongoUsersRepository()
    const useCase = new DeleteUserUseCase(usersRepository)

    return useCase
}