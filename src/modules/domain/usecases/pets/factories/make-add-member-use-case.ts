import { MongoPetsRepository } from "@/modules/domain/repositories/mongo/mongo-pets-repository"
import { AddMemberToPetUseCase } from "../source/add-member-to-pet-use-case"
import { MongoUsersRepository } from "@/modules/domain/repositories/mongo/mongo-users-repository"

export function makeAddMemberToPetUseCase() {
    const petsRepository = new MongoPetsRepository()
    const usersRepository = new MongoUsersRepository()
    const useCase = new AddMemberToPetUseCase(petsRepository, usersRepository)

    return useCase
}