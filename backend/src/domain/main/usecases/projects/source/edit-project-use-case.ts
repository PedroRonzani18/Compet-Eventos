import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { UserProps } from "@/domain/main/entities/user"
import { ProjectProps } from "@/domain/main/entities/project"
import { ProjectsRepository } from "@/domain/main/repositories/interfaces/projects-repository"

interface EditProjectUseCaseRequest {
    project_title: string,
    title?: string,
    author?: UserProps[],
    description?: string,
    image?: string,
}

type EditProjectUseCaseResponse = Either<
    ResourceNotFoundError,
    { project: ProjectProps }
>

export class EditProjectUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ author, description, image, title, project_title }: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {

        const project = await this.projectsRepository.edit(project_title, { author, description, image, title })

        if (!project)
            return left(new ResourceNotFoundError("Project"))

        return right({ project })
    }
}