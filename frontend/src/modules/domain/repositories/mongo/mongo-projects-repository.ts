import { ProjectModel } from "@/modules/core/db/schemas/project-schema";
import { ProjectProps, EditProjectProps } from "../../entities/project";
import { ProjectsRepository } from "../interfaces/projects-repository";
import { DefaultMongoDBRepository } from "@/modules/core/db/repositories/default-mongo-db-repository";
import connectDB from "@/modules/core/db/connect";

export class MongoProjectsRepository extends DefaultMongoDBRepository<ProjectProps> implements ProjectsRepository {

    constructor(private projectsModel = ProjectModel) {
        super(projectsModel);
    }


    async findByTitle(title: string): Promise<ProjectProps | undefined> {

        connectDB()

        const competiano = await this.projectsModel.findOne({ title })
        const result: ProjectProps | undefined = competiano?.toJSON()
        return result

    }

    async create(data: ProjectProps): Promise<ProjectProps> {
        data.updated_at = new Date()

        connectDB()

        const model = new this.projectsModel(data)

        const createdData = await model.save()
        if (!createdData) { throw new Error("Failed to create new Data") }

        const result: ProjectProps = createdData.toJSON<ProjectProps>()
        return result
    }

    async edit(title: string, data: EditProjectProps): Promise<ProjectProps | undefined> {

        data.updated_at = new Date()

        connectDB()

        const updatedMember = await this.projectsModel.findOneAndUpdate({ title }, data, { new: true })

        if (!updatedMember) { return }
        const result: ProjectProps | undefined = updatedMember.toJSON<ProjectProps>()
        return result
    }

    async delete(title: string): Promise<ProjectProps | undefined> {

        connectDB()

        const deletedMember = await this.projectsModel.findOne({ title })

        if (!deletedMember) { return }

        await deletedMember.deleteOne();
        return deletedMember.toJSON<ProjectProps>()
    }

    public list(): ProjectProps[] | Promise<ProjectProps[]> {
        throw new Error("Method not implemented.");
    }
}