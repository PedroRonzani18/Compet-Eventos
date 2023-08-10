import { ProjectModel } from "@/core/db/schemas/project-schema";
import { ProjectProps, Project } from "../../entities/project";
import { ProjectsRepository } from "../interfaces/projects-repository";
import { DefaultMongoDBRepository } from "@/core/db/repositories/default-mongo-db-repository";

export class MongoProjectsRepository extends DefaultMongoDBRepository<ProjectProps> implements ProjectsRepository {

    constructor(private projectsModel = ProjectModel) {
        super(projectsModel);
    }

    async create(data: ProjectProps): Promise<ProjectProps> {
        // const model = new this.projectsModel(data)
// 
        // const createdData = await model.save()
        // if (!createdData) { throw new Error("Failed to create new Data") }
        // 
        // const result: ProjectProps = createdData.toJSON<ProjectProps>()
        return data
    }
    
    async edit(data: any): Promise<Project> {
        throw new Error("Method not implemented.");
    }

    public list(): ProjectProps[] | Promise<ProjectProps[]> {
        throw new Error("Method not implemented.");
    }
}