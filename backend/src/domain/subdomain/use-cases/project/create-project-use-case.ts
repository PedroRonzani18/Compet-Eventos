import { ProjectsRepository } from "../../repositories/interfaces/projects-repository"
import { Project } from "@/core/db/schemas/project"

interface CreateProjectUseCaseRequest {
    title: String,
    author: String,
    description: String,
    image: String,
}

interface CreateProjectUseCaseResponse {
    project: Project
}

export class CreateProjectUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ description, author, image, title }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {

        const project = await this.projectsRepository.create({
            description, title, author, image
        })

        return { project }
    }
}