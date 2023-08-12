import { UserProps } from "../../entities/user"
import { UsersRepository } from "../../repositories/interfaces/users-repository"

interface CreateUserUseCaseRequest {
    name: string,
    email: string,
    profile_picture?: string,
    linkedin_url?: string,
    github_url?: string,
    favourite_projects?: string[]
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