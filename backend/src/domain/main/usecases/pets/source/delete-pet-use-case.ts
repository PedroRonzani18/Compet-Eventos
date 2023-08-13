import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { PetProps } from "@/domain/main/entities/pet"
import { PetsRepository } from "@/domain/main/repositories/interfaces/pets-repository"

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