import { UserModel } from "@/core/db/schemas/user-schema";
import { UserProps, EditUserProps } from "../../entities/user";
import { UsersRepository } from "../interfaces/users-repository";
import { DefaultMongoDBRepository } from "@/core/db/repositories/default-mongo-db-repository";

export class MongoUsersRepository extends DefaultMongoDBRepository<UserProps> implements UsersRepository {

    constructor(private usersModel = UserModel) {
        super(usersModel);
    }

    async create(data: UserProps): Promise<UserProps> {
        data.created_at = new Date()

        const model = new this.usersModel(data)

        const createdData = await model.save()
        if (!createdData) { throw new Error("Failed to create new Data") }
        
        const result: UserProps = createdData.toJSON<UserProps>()
        return result
    }
    
    async edit(name: string, data: EditUserProps): Promise<UserProps | undefined> {

        const updatedMember = await this.usersModel.findOneAndUpdate({ name }, data, { new: true })

        if (!updatedMember) { return }
        const result: UserProps | undefined = updatedMember.toJSON<UserProps>()
        return result
    }

    async findByName(name: string): Promise<UserProps | undefined> {
        const competiano = await this.usersModel.findOne({ name })
        const result: UserProps | undefined = competiano?.toJSON()
        return result
    }

    public list(): UserProps[] | Promise<UserProps[]> {
        throw new Error("Method not implemented.");
    }
}