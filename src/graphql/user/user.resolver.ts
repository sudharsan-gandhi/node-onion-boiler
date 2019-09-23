import { Resolver, Mutation, Args, Query } from 'type-graphql';
import { User } from '../../entity/user';
import { UserInput } from './user.input';
import { createBaseResolver } from '../base.resolver';

const userBaseResolver = createBaseResolver('User', User, UserInput);

@Resolver( () => User)
export class UserResolver extends userBaseResolver {
    // write additional methods in here for User
}

// @Resolver(User)
// export class UserResolver {
//     @Query(() => [User])
//     public async getAll(): Promise<User[]> {
//         return await User.find({});
//     }

//     @Mutation(() => User)
//     public async save(@Args() { name }: UserInput): Promise<User> {
//         const created = await User.create({name}).save();
//         console.log('created', created);
//         if (!!created) {
//             return created;
//         } else {
//             throw new Conflict('Cant create new user');
//         }
//     }
// }