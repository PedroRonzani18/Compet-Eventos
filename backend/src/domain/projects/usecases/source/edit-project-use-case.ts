import { UserProps } from "@/domain/users/entities/user"
import { ProjectProps } from "../../entities/project"
import { ProjectsRepository } from "../../repositories/interfaces/projects-repository"
import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

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