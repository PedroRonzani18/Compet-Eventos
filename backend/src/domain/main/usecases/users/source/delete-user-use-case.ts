import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { UserProps } from "@/domain/main/entities/user"
import { UsersRepository } from "@/domain/main/repositories/interfaces/users-repository"

interface DeleteUserUseCaseRequest {
    name: string
}

type DeleteUserUseCaseResponse = Either<
    ResourceNotFoundError,
    { user: UserProps }
>

export class DeleteUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ name }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {

        const user = await this.usersRepository.delete(name)

        if (!user)
            return left(new ResourceNotFoundError("User"))

        return right({ user })
    }
}