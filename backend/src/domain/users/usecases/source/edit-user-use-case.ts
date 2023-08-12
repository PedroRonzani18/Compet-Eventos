import { UserProps } from "@/domain/users/entities/user"
import { UsersRepository } from "../../repositories/interfaces/users-repository"
import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface EditUserUseCaseRequest {
    user_name: string,
    name?: string,
    email?: string,
    profile_picture?: string,
    linkedin_url?: string,
    github_url?: string,
    favourite_projects?: string[]
}

type EditUserUseCaseResponse = Either<
    ResourceNotFoundError,
    { user: UserProps }
>

export class EditUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ user_name, email, favourite_projects, github_url, linkedin_url, name, profile_picture }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {

        const user = await this.usersRepository.edit(user_name, { name, email, favourite_projects, github_url, linkedin_url, profile_picture } )

        if (!user) 
            return left(new ResourceNotFoundError("User"))

        return right({ user })
    }
}