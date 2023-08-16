import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { UserProps } from "@/modules/domain/entities/user"
import { UsersRepository } from "@/modules/domain/repositories/interfaces/users-repository"

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