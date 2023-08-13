import { Either, left, right } from "@/core/types/either";
import { ProjectProps } from "../../../main/entities/project"
import { ProjectsRepository } from "../../../main/repositories/interfaces/projects-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

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