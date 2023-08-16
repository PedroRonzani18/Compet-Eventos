import { Either, right } from "@/modules/core/types/either"
import { ProjectProps } from "@/modules/domain/entities/project"
import { UserProps } from "@/modules/domain/entities/user"
import { ProjectsRepository } from "@/modules/domain/repositories/interfaces/projects-repository"

interface CreateProjectUseCaseRequest {
    title: string,
    author: UserProps[],
    description: string,
    image: string,
}

type CreateProjectUseCaseResponse = Either<
    null,
    { project: ProjectProps }
>

export class CreateProjectUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ author, description, image, title }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {

        const project = await this.projectsRepository.create({
            author, description, image, title
        })

        return right({ project })
    }
}