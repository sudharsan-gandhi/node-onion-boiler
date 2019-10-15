import { Repository as typeRepository } from 'typeorm';
import { unmanaged, injectable } from 'inversify';

export type Query<T> = {
    [P in keyof T]?: T[P] | { $regex: RegExp };
};

export interface Repository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    findManyById(ids: string[]): Promise<T[]>;
    findByQuery(query?: Query<T>): Promise<T[]>;
    update(id: string, item: T): Promise<boolean>;
    save(data: any): Promise<T>;
    delete(id: string): Promise<boolean>;
    findByFieldName(fieldName: string, fieldValue: string): Promise<T>;
    findOneByFieldName(fieldName: string, fieldValue: string): Promise<T>
}

@injectable()
export abstract class GenericRepositoryImp<TEntity> implements Repository<TEntity> {

    private readonly repository: typeRepository<TEntity>;

    public constructor(@unmanaged() repository: typeRepository<TEntity>) {
        this.repository = repository;
    }

    public async findAll(): Promise<TEntity[]> {
        return await this.repository.find();
    }

    public async findById(id: string): Promise<TEntity> {
        return await this.repository.findOne(id);
    }

    public async findManyById(ids: string[]): Promise<TEntity[]> {
        return await this.repository.findByIds(ids);
    }

    public async findByQuery(query: Query<TEntity>): Promise<TEntity[]> {
        return await this.repository.find(query);
    }

    public async update(id: string, data: any): Promise<boolean> {
        const result = await this.repository.update(id, data);
        return !!result;
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return !!result;
    }

    public async save(data: any): Promise<TEntity> {
        const result = await this.repository.save(data);
        return result;
    }

    public async findByFieldName(fieldName: string, fieldValue: string): Promise<TEntity> {
        const result = await this.repository.createQueryBuilder().where(`${fieldName} = :value`).setParameter("value",fieldValue ).execute()
        return result;
    }

    public async findOneByFieldName(fieldName: string, fieldValue: string): Promise<TEntity> {
        const result = await this.repository.createQueryBuilder().where(`${fieldName} = :value`).setParameter("value",fieldValue ).execute()
        return result[0] || result;
    }

}