import { UsersRepository } from "../interfaces/users-repository";
import { EditUserProps, UserProps } from "../../entities/user";
import { UserModel } from "@/modules/core/db/schemas/user-schema";
import { DefaultMongoDBRepository } from "@/modules/core/db/repositories/default-mongo-db-repository";
import { connectToDatabase } from "@/modules/core/db";

export class MongoUsersRepository extends DefaultMongoDBRepository<UserProps> implements UsersRepository {

    constructor(private usersModel = UserModel) {
        super(usersModel);
    }

    async create(data: UserProps): Promise<UserProps> {
        data.created_at = new Date()

        connectToDatabase()

        const model = new this.usersModel(data)

        const createdData = await model.save()
        if (!createdData) { throw new Error("Failed to create new Data") }

        const result: UserProps = createdData.toJSON<UserProps>()
        return result
    }

    async edit(name: string, data: EditUserProps): Promise<UserProps | undefined> {

        data.updated_at = new Date()

        connectToDatabase()

        const updatedMember = await this.usersModel.findOneAndUpdate({ name }, data, { new: true })

        if (!updatedMember) { return }
        const result: UserProps | undefined = updatedMember.toJSON<UserProps>()
        return result
    }

    async findByName(name: string): Promise<UserProps | undefined> {

        connectToDatabase()

        const competiano = await this.usersModel.findOne({ name })
        const result: UserProps | undefined = competiano?.toJSON()
        return result
    }

    async delete(name: string): Promise<UserProps | undefined> {

        connectToDatabase()

        const deletedMember = await this.usersModel.findOne({ name })

        if (!deletedMember) { return }

        await deletedMember.deleteOne();
        return deletedMember.toJSON<UserProps>()
    }

    public list(): UserProps[] | Promise<UserProps[]> {
        throw new Error("Method not implemented.");
    }
}