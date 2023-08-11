import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface UserProps {
    name: String,
    email: String,
    profile_picture?: String,
    linkedin_url?: String,
    github_url?: String,
    favourite_projects?: String[]
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
