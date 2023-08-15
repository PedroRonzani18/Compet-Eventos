import { MongoPetsRepository } from "@/modules/domain/repositories/mongo/mongo-pets-repository"
import { CreatePetUseCase } from "../source/create-pet-use-case"

export function makeCreatePetUseCase() {
    const petsRepository = new MongoPetsRepository()
    const useCase = new CreatePetUseCase(petsRepository)

    return useCase
}