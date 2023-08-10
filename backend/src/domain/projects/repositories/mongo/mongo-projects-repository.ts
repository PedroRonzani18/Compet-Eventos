import { ProjectModel } from "@/core/db/schemas/project-schema";
import { ProjectProps, Project } from "../../entities/project";
import { ProjectsRepository } from "../interfaces/projects-repository";
import { DefaultMongoDBRepository } from "@/core/db/repositories/default-mongo-db-repository";

export class MongoProjectsRepository extends DefaultMongoDBRepository<ProjectProps> implements ProjectsRepository {
    
    constructor(private projectsModel = ProjectModel) {
        super(projectsModel);
    }
    public list(): ProjectProps[] | Promise<ProjectProps[]> {
        throw new Error("Method not implemented.");
    }
    public getByName(nome: string): ProjectProps | Promise<ProjectProps> {
        throw new Error("Method not implemented.");
    }
    public getByEmail(email: string): ProjectProps | Promise<ProjectProps> {
        throw new Error("Method not implemented.");
    }
    public deleteByName(nome: string): ProjectProps | Promise<ProjectProps> {
        throw new Error("Method not implemented.");
    }

    async create(data: ProjectProps) {
        const model = new this.projectsModel(data)

        const createdData = await model.save()
        if (!createdData) { throw new Error("Failed to create new Data") }
        
        const result: Project = createdData.toJSON<Project>()
        return result
    }
    
    async edit(data: any): Promise<Project> {
        throw new Error("Method not implemented.");
    }
}