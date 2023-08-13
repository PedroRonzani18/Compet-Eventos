import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { UserProps } from "@/domain/main/entities/user"
import { ProjectProps } from "@/domain/main/entities/project"
import { PetProps } from "@/domain/main/entities/pet"
import { PetsRepository } from "@/domain/main/repositories/interfaces/pets-repository"

interface EditPetUseCaseRequest {
    pet_name: string
    name?: string
    image?: string
    campus?: string
    members?: UserProps[]
    projects?: ProjectProps[]
}

type EditPetUseCaseResponse = Either<
    ResourceNotFoundError,
    { pet: PetProps }
>

export class EditPetUseCase {

    constructor(private petsRepository: PetsRepository) { }

    async execute({ campus, image, members, name, pet_name, projects }: EditPetUseCaseRequest): Promise<EditPetUseCaseResponse> {

        const pet = await this.petsRepository.edit(pet_name, { campus, image, members, name, projects })

        if (!pet)
            return left(new ResourceNotFoundError("Pet"))

        return right({ pet })
    }
}