import { ProjectProps } from "../../entities/project"
import { Either, left, right } from "@/core/types/either"
import { ProjectsRepository } from "../../repositories/interfaces/projects-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface DeleteProjectUseCaseRequest {
    name: string
}

type DeleteProjectUseCaseResponse = Either<
    ResourceNotFoundError,
    { project: ProjectProps }
>

export class DeleteProjectUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ name }: DeleteProjectUseCaseRequest): Promise<DeleteProjectUseCaseResponse> {

        const project = await this.projectsRepository.delete(name)

        if (!project) 
            return left(new ResourceNotFoundError("Project"))

        return right({ project })
    }
}