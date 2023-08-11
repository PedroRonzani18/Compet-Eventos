import { User, UserProps } from "../../entities/user"

export interface UsersRepository { // define quais metodos vao existir na comunicação entre repositorio e casos de uso
    create(data: UserProps): Promise<UserProps>
    edit(data: any): Promise<User>
}