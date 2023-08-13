import { Either, left, right } from "@/core/types/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { UserProps } from "@/domain/main/entities/user";
import { UsersRepository } from "@/domain/main/repositories/interfaces/users-repository";

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