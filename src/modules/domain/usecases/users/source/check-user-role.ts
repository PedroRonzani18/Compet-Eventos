import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { UsersRepository } from "@/modules/domain/repositories/interfaces/users-repository"

interface CheckUserRoleUseCaseRequest {
    user_name: string
    desired_role: string
}

type CheckUserRoleUseCaseResponse = Either<
    ResourceNotFoundError,
    { equal_role: boolean }
>

export class CheckUserRoleUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ desired_role, user_name }: CheckUserRoleUseCaseRequest): Promise<CheckUserRoleUseCaseResponse> {

        const user = await this.usersRepository.findByName(user_name)

        if (!user)
            return left(new ResourceNotFoundError("Usuario"))

        const roleEquals = (desired_role === user.role)

        return right({ equal_role: roleEquals })
    }
}