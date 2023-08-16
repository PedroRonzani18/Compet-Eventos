import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { PetProps } from "@/modules/domain/entities/pet"
import { PetsRepository } from "@/modules/domain/repositories/interfaces/pets-repository"

interface DeletePetUseCaseRequest {
    name: string
}

type DeletePetUseCaseResponse = Either<
    ResourceNotFoundError,
    { pet: PetProps }
>

export class DeletePetUseCase {

    constructor(private petsRepository: PetsRepository) { }

    async execute({ name }: DeletePetUseCaseRequest): Promise<DeletePetUseCaseResponse> {

        const pet = await this.petsRepository.delete(name)

        if (!pet)
            return left(new ResourceNotFoundError("Pet"))

        return right({ pet })
    }
}