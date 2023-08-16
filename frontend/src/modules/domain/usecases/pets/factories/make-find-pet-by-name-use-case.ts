import { MongoPetsRepository } from "@/modules/domain/repositories/mongo/mongo-pets-repository"
import { FindPetByNametUseCase } from "../source/find-pet-by-name-use-case"

export function makeFindPetByNameUseCase() {
    const petsRepository = new MongoPetsRepository()
    const useCase = new FindPetByNametUseCase(petsRepository)

    return useCase
}