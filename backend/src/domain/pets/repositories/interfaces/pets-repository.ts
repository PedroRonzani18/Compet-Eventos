import { EditPetProps, PetProps } from "../../entities/pet"

export interface PetsRepository { 
    create(data: PetProps): Promise<PetProps>
    edit(petName: string, data: EditPetProps): Promise<PetProps | undefined>
    findByName(title: string): Promise<PetProps | undefined>
}