import { MongoUsersRepository } from "@/domain/main/repositories/mongo/mongo-users-repository"
import { CheckUserRoleUseCase } from "../source/check-user-role"

export function makeCheckUserRoleUseCase() {
    const usersRepository = new MongoUsersRepository()
    const useCase = new CheckUserRoleUseCase(usersRepository)

    return useCase
}