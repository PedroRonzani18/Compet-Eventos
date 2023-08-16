import { Either, right } from "@/modules/core/types/either"
import { PetProps } from "@/modules/domain/entities/pet"
import { ProjectProps } from "@/modules/domain/entities/project"
import { UserProps } from "@/modules/domain/entities/user"
import { PetsRepository } from "@/modules/domain/repositories/interfaces/pets-repository"

interface CreatePetUseCaseRequest {
    name: string
    image: string
    campus: string
    members: UserProps[]
}

type CreatePetUseCaseResponse = Either<
    null,
    { pet: PetProps }
>

export class CreatePetUseCase {

    constructor(private petsRepository: PetsRepository) { }

    async execute({ campus, image, members, name, }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

        const emptyProjects: ProjectProps[] = []

        const pet = await this.petsRepository.create({
            campus, image, members, name, projects: emptyProjects
        })

        return right({ pet })
    }
}