import { UserProps } from "../../entities/user"
import { UsersRepository } from "../../repositories/interfaces/users-repository"

interface FindUserByNameUseCaseRequest {
    name: string
}

interface FindUserByNameUseCaseResponse {
    user: UserProps
}

export class FindUserByNametUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ name }: FindUserByNameUseCaseRequest): Promise<FindUserByNameUseCaseResponse> {

        const user = await this.usersRepository.findByName(name);

        if(!user) throw new Error("User not found by name")

        return { user }
    }
}