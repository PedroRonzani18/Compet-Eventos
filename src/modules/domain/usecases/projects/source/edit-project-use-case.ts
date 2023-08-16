import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { ProjectProps } from "@/modules/domain/entities/project"
import { UserProps } from "@/modules/domain/entities/user"
import { ProjectsRepository } from "@/modules/domain/repositories/interfaces/projects-repository"

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