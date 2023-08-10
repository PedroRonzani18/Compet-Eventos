import { ProjectsRepository } from "../interfaces/projects-repository";

export class PrismaProjectsRepository implements ProjectsRepository {
    
    create(data: Prisma.ProjectCreateInput): Promise<Project> {
        throw new Error("Method not implemented.");
    }
    edit(data: any): Promise<Project> {
        throw new Error("Method not implemented.");
    }

}