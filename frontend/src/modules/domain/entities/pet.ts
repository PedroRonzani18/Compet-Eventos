import { UserProps } from './user'
import { ProjectProps } from './project'
import { UniqueEntityID } from '@/modules/core/entities/unique-entity-id'
import { Entity } from '@/modules/core/entities/entity'

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
    updated_at?: Date
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
