import { ProjectProps } from "../../entities/project"
import { ProjectsRepository } from "../../repositories/interfaces/projects-repository"

interface FindProjectByTitleUseCaseRequest {
    title: string
}

interface FindProjectByTitleUseCaseResponse {
    project: ProjectProps
}

export class FindProjectByTitletUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ title }: FindProjectByTitleUseCaseRequest): Promise<FindProjectByTitleUseCaseResponse> {

        const project = await this.projectsRepository.findByTitle(title);

        if(!project) throw new Error("Project not found by title")

        return { project }
    }
}