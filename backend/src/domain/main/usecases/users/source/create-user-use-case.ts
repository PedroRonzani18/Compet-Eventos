import { Either, right } from "@/core/types/either"
import { UserProps } from "@/domain/main/entities/user"
import { UsersRepository } from "@/domain/main/repositories/interfaces/users-repository"

interface CreateUserUseCaseRequest {
    name: string,
    email: string,
    profile_picture?: string,
    linkedin_url?: string,
    github_url?: string,
    favourite_projects?: string[]
}

type CreateUserUseCaseResponse = Either<
    null,
    { user: UserProps }
>

export class CreateUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, favourite_projects, github_url, linkedin_url, name, profile_picture }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const user = await this.usersRepository.create({
            email, favourite_projects, github_url, linkedin_url, name, profile_picture
        })

        return right({ user })
    }
}