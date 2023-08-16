import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error";
import { Either, left, right } from "@/modules/core/types/either";
import { UserProps } from "@/modules/domain/entities/user";
import { UsersRepository } from "@/modules/domain/repositories/interfaces/users-repository";

interface FindUserByNameUseCaseRequest {
    name: string
}

type FindUserByNameUseCaseResponse = Either<
    ResourceNotFoundError,
    { user: UserProps }
>

export class FindUserByNametUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ name }: FindUserByNameUseCaseRequest): Promise<FindUserByNameUseCaseResponse> {

        const user = await this.usersRepository.findByName(name);

        if (!user)
            return left(new ResourceNotFoundError("User by name"))

        return right({ user })
    }
}