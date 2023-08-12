import { MongoUsersRepository } from "../../repositories/mongo/mongo-users-repository"
import { EditUserUseCase } from "../source/edit-user-use-case"

export function makeEditUserUseCase() {
    const usersRepository = new MongoUsersRepository()
    const useCase = new EditUserUseCase(usersRepository)

    return useCase
}