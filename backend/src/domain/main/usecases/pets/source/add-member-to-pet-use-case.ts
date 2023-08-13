import { Either, left, right } from "@/core/types/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { EntityAlreadyAdded } from "@/core/errors/entity-already-added-error";
import { PetsRepository } from "@/domain/main/repositories/interfaces/pets-repository";
import { User } from "@/domain/main/entities/user";
import { UsersRepository } from "@/domain/main/repositories/interfaces/users-repository";

interface AddMemberToPetUseCaseRequest {
    member_name: string
    pet_name: string
}

type AddMemberToPetUseCaseResponse = Either<
    EntityAlreadyAdded | EntityAlreadyAdded,
    {}
>

export class AddMemberToPetUseCase {

    constructor(private petsRepository: PetsRepository, private usersRepository: UsersRepository) { }

    async execute({ member_name, pet_name }: AddMemberToPetUseCaseRequest): Promise<AddMemberToPetUseCaseResponse> {

        const pet = await this.petsRepository.findByName(pet_name)

        if (!pet)
            return left(new ResourceNotFoundError("Pet"))

        const userInPet = pet.members.find((member: User) => { member.name === member_name })

        if (userInPet)
            return left(new EntityAlreadyAdded("Member", "Pet"))

        const newMember = await this.usersRepository.findByName(member_name)

        if (!newMember)
            return left(new ResourceNotFoundError("Member in Pet"))

        pet.members.push(newMember)

        await this.petsRepository.edit(pet_name, pet)

        return right({})
    }
}