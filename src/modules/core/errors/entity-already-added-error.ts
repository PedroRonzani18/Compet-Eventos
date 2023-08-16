import { UseCaseError } from "./use-case-errors";

export class EntityAlreadyAdded extends Error implements UseCaseError {
    constructor(entity: string, resource: string) {
        super(`Entity (${entity}) already added to (${resource})`)
    }
}