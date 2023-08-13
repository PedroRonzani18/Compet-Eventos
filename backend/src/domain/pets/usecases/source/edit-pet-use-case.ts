import { UserProps } from "@/domain/users/entities/user"
import { PetProps } from "../../entities/pet"
import { PetsRepository } from "../../repositories/interfaces/pets-repository"
import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { ProjectProps } from "@/domain/projects/entities/project"

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