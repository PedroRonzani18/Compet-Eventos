import { EditUserProps, User, UserProps } from "../../entities/user"

export interface UsersRepository { // define quais metodos vao existir na comunicação entre repositorio e casos de uso
    create(data: UserProps): Promise<UserProps>
    edit(name: string, data: EditUserProps): Promise<UserProps | undefined>
    findByName(name: string): Promise<UserProps | undefined>
    delete(title: string): Promise<UserProps | undefined>
}