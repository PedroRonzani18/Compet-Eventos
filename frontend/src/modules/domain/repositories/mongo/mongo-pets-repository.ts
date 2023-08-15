import { PetsRepository } from "../interfaces/pets-repository";
import { EditPetProps, PetProps } from "../../entities/pet";
import { PetModel } from "@/modules/core/db/schemas/pet-schema";
import { DefaultMongoDBRepository } from "@/modules/core/db/repositories/default-mongo-db-repository";
import connectDB from "@/modules/core/db/connect";

export class MongoPetsRepository extends DefaultMongoDBRepository<PetProps> implements PetsRepository {

    constructor(private petsModel = PetModel) {
        super(petsModel);
    }

    async findByName(name: string): Promise<PetProps | undefined> {

        connectDB()

        const competiano = await this.petsModel.findOne({ name })
        const result: PetProps | undefined = competiano?.toJSON()
        return result
    }

    async create(data: PetProps): Promise<PetProps> {
        data.updated_at = new Date()

        connectDB()

        const model = new this.petsModel(data)

        const createdData = await model.save()
        if (!createdData) { throw new Error("Failed to create new Data") }

        const result: PetProps = createdData.toJSON<PetProps>()
        return result
    }

    async edit(name: string, data: EditPetProps): Promise<PetProps | undefined> {

        data.updated_at = new Date()

        connectDB()

        const updatedMember = await this.petsModel.findOneAndUpdate({ name }, data, { new: true })

        if (!updatedMember) { return }
        const result: PetProps | undefined = updatedMember.toJSON<PetProps>()
        return result
    }

    async delete(name: string): Promise<PetProps | undefined> {
        
        connectDB()

        const deletedMember = await this.petsModel.findOne({ name })

        if (!deletedMember) { return }

        await deletedMember.deleteOne();
        return deletedMember.toJSON<PetProps>()
    }

    public list(): PetProps[] | Promise<PetProps[]> {
        throw new Error("Method not implemented.");
    }
}