import { Project, ProjectProps } from "../../entities/project"

export interface ProjectsRepository { // define quais metodos vao existir na comunicação entre repositorio e casos de uso
    create(data: ProjectProps): Promise<Project>
    edit(data: any): Promise<Project>
}