import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error";
import { Either, left, right } from "@/modules/core/types/either";
import { ProjectProps } from "@/modules/domain/entities/project";
import { ProjectsRepository } from "@/modules/domain/repositories/interfaces/projects-repository";

interface FindProjectByTitleUseCaseRequest {
    title: string
}

type FindProjectByTitleUseCaseResponse = Either<
    ResourceNotFoundError,
    { project: ProjectProps }
>

export class FindProjectByTitletUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ title }: FindProjectByTitleUseCaseRequest): Promise<FindProjectByTitleUseCaseResponse> {

        const project = await this.projectsRepository.findByTitle(title);

        if (!project)
            return left(new ResourceNotFoundError("Project by Title"))

        return right({ project })
    }
}