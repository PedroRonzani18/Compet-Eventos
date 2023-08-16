import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error";
import { Either, left, right } from "@/modules/core/types/either";
import { UserProps } from "@/modules/domain/entities/user";
import { UsersRepository } from "@/modules/domain/repositories/interfaces/users-repository";

interface FindUserByEmailUseCaseRequest {
    email: string
}

type FindUserByEmailUseCaseResponse = Either<
    ResourceNotFoundError,
    { user: UserProps }
>

export class FindUserByEmailtUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ email }: FindUserByEmailUseCaseRequest): Promise<FindUserByEmailUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            return left(new ResourceNotFoundError("User by email"))

        return right({ user })
    }
}