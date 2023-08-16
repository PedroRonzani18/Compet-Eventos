import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { ProjectProps } from "@/modules/domain/entities/project"
import { ProjectsRepository } from "@/modules/domain/repositories/interfaces/projects-repository"

interface DeleteProjectUseCaseRequest {
    title: string
}

type DeleteProjectUseCaseResponse = Either<
    ResourceNotFoundError,
    { project: ProjectProps }
>

export class DeleteProjectUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ title }: DeleteProjectUseCaseRequest): Promise<DeleteProjectUseCaseResponse> {

        const project = await this.projectsRepository.delete(title)

        if (!project)
            return left(new ResourceNotFoundError("Project"))

        return right({ project })
    }
}