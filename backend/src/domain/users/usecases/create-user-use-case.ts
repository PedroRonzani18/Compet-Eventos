import { UsersRepository } from "../repositories/interfaces/users-repository"

interface CreateUserUseCaseRequest {
    title: String,
    author: String,
    description: String,
    image: String,
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ description, author, image, title }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const user = await this.usersRepository.create({
            description, title, author, image
        })

        return { user, }
    }
}