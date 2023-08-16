import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error";
import { Either, left, right } from "@/modules/core/types/either";
import { PetProps } from "@/modules/domain/entities/pet";
import { PetsRepository } from "@/modules/domain/repositories/interfaces/pets-repository";

interface FindPetByNameUseCaseRequest {
    name: string
}

type FindPetByNameUseCaseResponse = Either<
    ResourceNotFoundError,
    { pet: PetProps }
>

export class FindPetByNametUseCase {

    constructor(private petsRepository: PetsRepository) { }

    async execute({ name }: FindPetByNameUseCaseRequest): Promise<FindPetByNameUseCaseResponse> {

        const pet = await this.petsRepository.findByName(name);

        if (!pet)
            return left(new ResourceNotFoundError("Pet by Name"))

        return right({ pet })
    }
}