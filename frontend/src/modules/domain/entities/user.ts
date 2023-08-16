import { Entity } from "@/modules/core/entities/entity";
import { UniqueEntityID } from "@/modules/core/entities/unique-entity-id";

export type UserProps = {
    name: string,
    email: string,
    password_hash: string,
    profile_picture?: string,
    linkedin_url?: string,
    github_url?: string,
    favourite_projects?: string[]
    created_at?: Date
    updated_at?: Date
    role: string
};


export type EditUserProps = {
    name?: string,
    email?: string,
    profile_picture?: string,
    linkedin_url?: string,
    github_url?: string,
    favourite_projects?: string[],
    updated_at?: Date
}


export class User extends Entity<UserProps> {

    constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get name() { return this.props.name }
    get email() { return this.props.email }
    get profile_picture() { return this.props.profile_picture }
    get linkedin_url() { return this.props.linkedin_url }
    get github_url() { return this.props.github_url }
    get favourite_projects() { return this.props.favourite_projects }
}
