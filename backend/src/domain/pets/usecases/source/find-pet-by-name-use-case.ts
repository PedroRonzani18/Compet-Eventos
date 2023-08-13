import { Either, left, right } from "@/core/types/either";
import { PetProps } from "../../entities/pet"
import { PetsRepository } from "../../repositories/interfaces/pets-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

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