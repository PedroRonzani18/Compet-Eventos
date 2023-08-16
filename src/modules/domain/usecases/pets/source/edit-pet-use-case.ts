import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { PetProps } from "@/modules/domain/entities/pet"
import { ProjectProps } from "@/modules/domain/entities/project"
import { UserProps } from "@/modules/domain/entities/user"
import { PetsRepository } from "@/modules/domain/repositories/interfaces/pets-repository"

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