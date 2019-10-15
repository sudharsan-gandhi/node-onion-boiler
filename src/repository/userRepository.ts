import { injectable } from 'inversify';
import { GenericRepositoryImp } from './repository';
import { getRepository } from 'typeorm';
import { User, UserInterface } from '../entity/user';
import { generatePasswordHash } from '../utils/jwt';

@injectable()
export class UserRepository extends GenericRepositoryImp<User> {

    constructor() {
        super(getRepository(User));
    }

    public async save(data: UserInterface): Promise<User> {
            data.password = generatePasswordHash(data.password)
            const result = await super.save(data);
            delete result.password;
            return result;
    }

}