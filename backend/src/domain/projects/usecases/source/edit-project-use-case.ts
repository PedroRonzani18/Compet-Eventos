import { UserProps } from "@/domain/users/entities/user"
import { ProjectProps } from "../../entities/project"
import { ProjectsRepository } from "../../repositories/interfaces/projects-repository"

interface EditProjectUseCaseRequest {
    project_title: string,
    title?: string,
    author?: UserProps[],
    description?: string,
    image?: string,
}

interface EditProjectUseCaseResponse {
    project: ProjectProps
}

export class EditProjectUseCase {

    constructor(private projectsRepository: ProjectsRepository) { }

    async execute({ author, description, image, title, project_title }: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {

        const project = await this.projectsRepository.edit(project_title, { author, description, image, title})

        if(!project) throw new Error('Project not found')

        return { project }
    }
}