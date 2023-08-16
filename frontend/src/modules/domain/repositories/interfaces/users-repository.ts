import { EditUserProps, UserProps } from "../../entities/user"

export interface UsersRepository { // define quais metodos vao existir na comunicação entre repositorio e casos de uso
    create(data: UserProps): Promise<UserProps>
    edit(name: string, data: EditUserProps): Promise<UserProps | undefined>
    findByName(name: string): Promise<UserProps | undefined>
    findByEmail(email: string): Promise<UserProps | undefined>
    delete(name: string): Promise<UserProps | undefined>
}