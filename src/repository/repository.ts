import {
    Repository as TypeormRepository,
    FindConditions,
    FindOneOptions,
    FindManyOptions,
} from 'typeorm';
import { unmanaged, injectable } from 'inversify';


export interface Repository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    findManyById(ids: string[], options?: FindOneOptions): Promise<T[]>;
    findByQuery(options?: FindManyOptions<T>): Promise<T[]>;
    update(id: string, item: T): Promise<boolean>;
    save(data: any): Promise<T>;
    delete(idorCondition: string | FindConditions<T>): Promise<boolean>;
}

@injectable()
export abstract class GenericRepositoryImp<TEntity> implements Repository<TEntity> {

    protected readonly repository: TypeormRepository<TEntity>;

    public constructor(@unmanaged() repository: TypeormRepository<TEntity>) {
        this.repository = repository;
    }

    public async create(data: any): Promise<TEntity[]> {
        return this.repository.create(data);
    }

    public async findAll(): Promise<TEntity[]> {
        return await this.repository.find();
    }

    public async findById(id: string, options?: FindOneOptions): Promise<TEntity | undefined> {
        return await this.repository.findOne(id, options);
    }

    public async findManyById(ids: string[]): Promise<TEntity[]> {
        return await this.repository.findByIds(ids);
    }

    public async findByQuery(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
        return await this.repository.find(options);
    }

    public async update(id: string, data: any): Promise<boolean> {
        const result = await this.repository.update(id, data);
        return !!result;
    }

    public async delete(idorCondition: string | FindConditions<TEntity>): Promise<boolean> {
        const result = await this.repository.delete(idorCondition);
        return !!result;
    }

    public async save(data: any): Promise<TEntity> {
        const result = await this.repository.save(data);
        return result;
    }

}