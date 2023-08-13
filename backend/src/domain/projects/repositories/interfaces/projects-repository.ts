import { EditProjectProps, ProjectProps } from "../../entities/project"

export interface ProjectsRepository { 
    create(data: ProjectProps): Promise<ProjectProps>
    edit(projectName: string, data: EditProjectProps): Promise<ProjectProps | undefined>
    findByTitle(title: string): Promise<ProjectProps | undefined>
    delete(title: string): Promise<ProjectProps | undefined>
}