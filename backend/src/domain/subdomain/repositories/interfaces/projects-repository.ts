export interface ProjectsRepository { // define quais metodos vao existir na comunicação entre repositorio e casos de uso
    create(data: Prisma.ProjectCreateInput): Promise<Project>
    edit(data: any): Promise<Project>
}