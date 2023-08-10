export interface UsersRepository { // define quais metodos vao existir na comunicação entre repositorio e casos de uso
    create(data: Prisma.UserCreateInput): Promise<User>
    edit(data: any): Promise<User>
}