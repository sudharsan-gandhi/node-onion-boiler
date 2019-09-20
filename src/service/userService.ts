import { injectable, inject } from 'inversify';
import Types from '../config/types';
import { NotFound, Conflict } from '../utils/exceptions';
import { User } from '../entity/user';
import { UserRepository } from '../repository/userRepository';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';


export interface UserService {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    save(name: string): Promise<string>;
}

@injectable()
@Resolver()
export class UserServiceImp implements UserService {

    constructor(
        @inject(Types.UserRepository) private userRepository: UserRepository
    ) {}

    @Query(() => [User])
    public async getAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    @Query(() => User)
    public async getById(id: string): Promise<User> {
        const vehicle = await this.userRepository.findById(id);
        if (vehicle !== undefined) return vehicle;
        throw new NotFound('cannot find user');
    }

    @Mutation(() => User)
    public async save(@Arg('name') name: string): Promise<string> {
        const created = await this.userRepository.save({ name });
        if (created) return 'User created successfully';
        throw new Conflict('Cant create new user');
    }

    // public async newVehicle(userId: string, vehicleId: string): Promise<string> {
    //     const user = await this.userRepository.findById(userId);
    //     if (user !== undefined) {
    //         const vehicle = await this.vehicleRepository.findById(vehicleId);
    //         if (vehicle !== undefined) {
    //             user.vehicles.push(vehicle);
    //             console.log(user);
    //             await this.userRepository.save(user);
    //             return 'Vehicle added successfully';
    //         } else {
    //             throw new NotFound('Cant find vehicles with that id');
    //         }
    //     } else {
    //         throw new NotFound('Cant find user with that id');
    //     }
    // }

}