import type { BaseRepository } from './repository';

export abstract class Repository<T> implements BaseRepository<T> {
	public abstract create(data: T): Promise<T | undefined> | T | undefined;
	public abstract list(): Promise<T[]> | T[];
	// public abstract getByName(nome: string): Promise<T | undefined> | T | undefined;
	// public abstract getByEmail(email: string): Promise<T | undefined> | T | undefined;
	// public abstract deleteByName(nome: string): Promise<T | undefined> | T | undefined;
}