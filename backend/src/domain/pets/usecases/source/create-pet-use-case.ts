import { UserProps } from "@/domain/users/entities/user"
import { PetProps } from "../../entities/pet"
import { Either, right } from "@/core/types/either"
import { PetsRepository } from "../../repositories/interfaces/pets-repository"
import { ProjectProps } from "@/domain/projects/entities/project"

interface CreatePetUseCaseRequest {
    name: string
    image: string
    campus: string
    members: UserProps[]
    projects: ProjectProps[]
}

type CreatePetUseCaseResponse = Either<
  null ,
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