import { MongoPetsRepository } from "@/domain/main/repositories/mongo/mongo-pets-repository"
import { EditPetUseCase } from "../source/edit-pet-use-case"

export function makeEditPetUseCase() {
    const petsRepository = new MongoPetsRepository()
    const useCase = new EditPetUseCase(petsRepository)

    return useCase
}