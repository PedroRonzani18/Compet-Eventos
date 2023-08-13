import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { ProjectProps } from "@/domain/main/entities/project"
import { ProjectsRepository } from "@/domain/main/repositories/interfaces/projects-repository"

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