import { Either, right } from "@/core/types/either"
import { PetProps } from "@/domain/main/entities/pet"
import { ProjectProps } from "@/domain/main/entities/project"
import { UserProps } from "@/domain/main/entities/user"
import { PetsRepository } from "@/domain/main/repositories/interfaces/pets-repository"

interface CreatePetUseCaseRequest {
    name: string
    image: string
    campus: string
    members: UserProps[]
    projects: ProjectProps[]
}

type CreatePetUseCaseResponse = Either<
    null,
    { pet: PetProps }
>

export class CreatePetUseCase {

    constructor(private petsRepository: PetsRepository) { }

    async execute({ campus, image, members, name, projects, }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

        const pet = await this.petsRepository.create({
            campus, image, members, name, projects
        })

        return right({ pet })
    }
}