import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProjectProps {
    title: String,
    author: String,
    description: String,
    image: String,
    createdAt?: Date // é opcional para passar como parâmetro, mas n para ter no db (por isso optional)
    updatedAt?: Date
}

export class Project extends Entity<ProjectProps> {

    constructor(props: ProjectProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get title() { return this.props.title }
    get author() { return this.props.author }
    get description() { return this.props.description }
    get image() { return this.props.image }
    get createdAt() { return this.props.createdAt }
    get updatedAt() { return this.props.updatedAt }
}
