import { MongoPetsRepository } from "@/modules/domain/repositories/mongo/mongo-pets-repository"
import { DeletePetUseCase } from "../source/delete-pet-use-case"

export function makeDeletePetUseCase() {
    const petsRepository = new MongoPetsRepository()
    const useCase = new DeletePetUseCase(petsRepository)

    return useCase
}