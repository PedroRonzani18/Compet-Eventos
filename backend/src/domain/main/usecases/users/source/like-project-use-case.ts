import { Either, left, right } from "@/core/types/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { UsersRepository } from "@/domain/main/repositories/interfaces/users-repository";

interface LikeProjectUseCaseRequest {
    user_name: string
    project_name: string
}

type LikeProjectUseCaseResponse = Either<
    ResourceNotFoundError,
    {}
>

export class LikeProjectUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ project_name, user_name }: LikeProjectUseCaseRequest): Promise<LikeProjectUseCaseResponse> {

        const user = await this.usersRepository.findByName(user_name)

        if (!user)
            return left(new ResourceNotFoundError("Usuario"))

        const favoriteProject = user?.favourite_projects?.find((project: string) => project === project_name);

        if (!favoriteProject) {
            user?.favourite_projects?.push(project_name)
        }

        await this.usersRepository.edit(user_name, user)

        return right({})
    }
}