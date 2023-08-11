import { UserProps } from "../../entities/user"
import { UsersRepository } from "../../repositories/interfaces/users-repository"

interface CreateUserUseCaseRequest {
    name: String,
    email: String,
    profile_picture?: String,
    linkedin_url?: String,
    github_url?: String,
    favourite_projects?: String[]
}

interface CreateUserUseCaseResponse {
    user: UserProps
}

export class CreateUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, favourite_projects, github_url, linkedin_url, name, profile_picture }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const user = await this.usersRepository.create({
            email, favourite_projects, github_url, linkedin_url, name, profile_picture
        })

        return { user }
    }
}