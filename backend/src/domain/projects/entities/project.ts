import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PetProps } from '@/domain/pets/entities/pet';
import { UserProps } from '@/domain/users/entities/user'

export type ProjectProps = {
    title: string;
    author: UserProps[];
    description: string;
    image: string;
    pet_owner?: PetProps;
    external_owners?: UserProps[];
    created_at?: Date;
    updated_at?: Date;
}

export type EditProjectProps = {
    title?: string;
    author?: UserProps[];
    description?: string;
    image?: string;
}

export class Project extends Entity<ProjectProps> {

    constructor(props: ProjectProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get title() { return this.props.title }
    get author() { return this.props.author }
    get description() { return this.props.description }
    get image() { return this.props.image }
    get createdAt() { return this.props.created_at }
    get updatedAt() { return this.props.updated_at }
}
