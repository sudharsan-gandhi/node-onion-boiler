import { injectable, inject } from 'inversify';
import Types from '../config/types';
import { NotFound, Conflict } from '../utils/exceptions';
import { User, UserInterface } from '../entity/user';
import { UserRepository } from '../repository/userRepository';
import { Not } from 'typeorm';


export interface UserService {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    save(user: UserInterface): Promise<User>;
    getByEmail(email: string): Promise<User>;
}

@injectable()
export class UserServiceImp implements UserService {

    constructor(
        @inject(Types.UserRepository) private userRepository: UserRepository
    ) {}

    public async getAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async getById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (user !== undefined) return user;
        throw new NotFound('cant find the user');
    }

    public async save(user: UserInterface): Promise<User> {
        const createdUser = await this.userRepository.save({ name });
        if (!!createdUser) return createdUser;
        throw new Conflict('Cant create new user');
    }

    public async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findBOneByFieldName("email", email)
        if(!!user) return user;
        throw new NotFound('No user found');
    }

    // public async newuser(userId: string, userId: string): Promise<string> {
    //     const user = await this.userRepository.findById(userId);
    //     if (user !== undefined) {
    //         const user = await this.userRepository.findById(userId);
    //         if (user !== undefined) {
    //             user.users.push(user);
    //             console.log(user);
    //             await this.userRepository.save(user);
    //             return 'user added successfully';
    //         } else {
    //             throw new NotFound('Cant find users with that id');
    //         }
    //     } else {
    //         throw new NotFound('Cant find user with that id');
    //     }
    // }

}