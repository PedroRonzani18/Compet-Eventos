import { UseCaseError } from "./use-case-errors";

export class NotAllowedError extends Error implements UseCaseError {
    constructor() {
        super('Resource not Found')
    }
}