import { Project, ProjectProps } from "../../entities/project"

export interface ProjectsRepository { // define quais metodos vao existir na comunicação entre repositorio e casos de uso
    create(data: ProjectProps): Promise<ProjectProps>
    edit(data: any): Promise<Project>
}