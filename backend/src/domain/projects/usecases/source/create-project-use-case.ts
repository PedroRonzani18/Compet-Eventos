import { ProjectProps } from "../../entities/project"
import { ProjectsRepository } from "../../repositories/interfaces/projects-repository"

interface CreateProjectUseCaseRequest {
    title: String,
    author: String,
    description: String,
    image: String,
}

interface CreateProjectUseCaseResponse {
    project: ProjectProps
}

export class CreateProjectUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ author, description, image, title }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {

        const project = await this.projectsRepository.create({
            author, description, image, title
        })

        return { project }
    }
}