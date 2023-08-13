import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ProjectProps } from '@/domain/projects/entities/project'
import { UserProps } from '@/domain/users/entities/user'

export type PetProps = {
    name: string
    image: string
    campus: string
    members: UserProps[]
    projects: ProjectProps[]
    created_at?: Date
    updated_at?: Date
}

export type EditPetProps = {
    name?: string
    image?: String
    campus?: string
    members?: UserProps[]
    projects?: ProjectProps[]
}

export class Pet extends Entity<PetProps> {

    constructor(props: PetProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get name() { return this.props.name }
    get image() { return this.props.image }
    get campus() { return this.props.campus }
    get members() { return this.props.members }
    get projects() { return this.props.projects }
    get created_at() { return this.props.created_at }
    get updated_at() { return this.props.updated_at }

}
