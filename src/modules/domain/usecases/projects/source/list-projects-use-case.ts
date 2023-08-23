import { Either, right } from "@/modules/core/types/either";
import { ProjectProps } from "@/modules/domain/entities/project";
import { ProjectsRepository } from "@/modules/domain/repositories/interfaces/projects-repository";

interface ListAllProjectsUseCaseRequest { }

type ListAllProjectsUseCaseResponse = Either<
    null,
    { projects: ProjectProps[] }
>

export class ListAllProjectstUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute(): Promise<ListAllProjectsUseCaseResponse> {

        const projects = await this.projectsRepository.list();

        return right({ projects })
    }
}