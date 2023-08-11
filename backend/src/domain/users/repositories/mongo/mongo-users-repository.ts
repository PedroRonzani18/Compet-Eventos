import { UserModel } from "@/core/db/schemas/user-schema";
import { UserProps, User } from "../../entities/user";
import { UsersRepository } from "../interfaces/users-repository";
import { DefaultMongoDBRepository } from "@/core/db/repositories/default-mongo-db-repository";

export class MongoUsersRepository extends DefaultMongoDBRepository<UserProps> implements UsersRepository {

    constructor(private usersModel = UserModel) {
        super(usersModel);
    }

    async create(data: UserProps): Promise<UserProps> {
        const model = new this.usersModel(data)

        const createdData = await model.save()
        if (!createdData) { throw new Error("Failed to create new Data") }
        
        const result: UserProps = createdData.toJSON<UserProps>()
        return result
    }
    
    async edit(data: any): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public list(): UserProps[] | Promise<UserProps[]> {
        throw new Error("Method not implemented.");
    }
}