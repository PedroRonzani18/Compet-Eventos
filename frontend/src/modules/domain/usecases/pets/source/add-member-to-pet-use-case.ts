import { EntityAlreadyAdded } from "@/modules/core/errors/entity-already-added-error"
import { ResourceNotFoundError } from "@/modules/core/errors/resource-not-found-error"
import { Either, left, right } from "@/modules/core/types/either"
import { User } from "@/modules/domain/entities/user"
import { PetsRepository } from "@/modules/domain/repositories/interfaces/pets-repository"
import { UsersRepository } from "@/modules/domain/repositories/interfaces/users-repository"

interface AddMemberToPetUseCaseRequest {
    member_name: string
    pet_name: string
}

type AddMemberToPetUseCaseResponse = Either<
    EntityAlreadyAdded | ResourceNotFoundError,
    {}
>

export class AddMemberToPetUseCase {

    constructor(private petsRepository: PetsRepository, private usersRepository: UsersRepository) { }

    async execute({ member_name, pet_name }: AddMemberToPetUseCaseRequest): Promise<AddMemberToPetUseCaseResponse> {

        const pet = await this.petsRepository.findByName(pet_name)

        if (!pet)
            return left(new ResourceNotFoundError("Pet"))

        const newMember = await this.usersRepository.findByName(member_name)

        if (!newMember)
            return left(new ResourceNotFoundError("Member"))

        const userInPet = pet.members.find((member: User) => { member.name === member_name })

        if (userInPet)
            return left(new EntityAlreadyAdded("Member", "Pet"))

        pet.members.push(newMember)

        await this.petsRepository.edit(pet_name, pet)

        return right({})
    }
}