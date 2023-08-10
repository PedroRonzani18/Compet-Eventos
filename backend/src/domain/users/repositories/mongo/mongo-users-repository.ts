import { UsersRepository } from "../interfaces/users-repository";

export class PrismaUsersRepository implements UsersRepository {
    
    create(data: Prisma.ProjectCreateInput): Promise<Project> {
        throw new Error("Method not implemented.");
    }
    edit(data: any): Promise<Project> {
        throw new Error("Method not implemented.");
    }

}