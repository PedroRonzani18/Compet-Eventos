import { Either, left, right } from "@/core/types/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { PetProps } from "@/domain/main/entities/pet";
import { PetsRepository } from "@/domain/main/repositories/interfaces/pets-repository";

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