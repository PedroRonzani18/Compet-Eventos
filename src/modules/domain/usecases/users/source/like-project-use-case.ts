import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { UserProps } from "@/modules/domain/entities/user"
import { UsersRepository } from "@/modules/domain/repositories/interfaces/users-repository"

interface LikeProjectUseCaseRequest {
    user_name: string
    project_name: string
}

type LikeProjectUseCaseResponse = Either<
    ResourceNotFoundError,
    { editedUser: UserProps }
>

export class LikeProjectUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ project_name, user_name }: LikeProjectUseCaseRequest): Promise<LikeProjectUseCaseResponse> {

        const user = await this.usersRepository.findByName(user_name)

        if (!user)
            return left(new ResourceNotFoundError("Usuario"))

        const favoriteProject = user?.favourite_projects?.find((project: string) => project === project_name);

        if (!favoriteProject)
            user?.favourite_projects?.push(project_name)

        const editedUser = await this.usersRepository.edit(user_name, user)

        if (!editedUser)
            return left(new ResourceNotFoundError("Usuario"))

        return right({ editedUser })
    }
}