import { Resolver, ClassType, Query, Arg, Mutation, Args } from 'type-graphql';
import { Conflict } from '../utils/exceptions';

export function createBaseResolver <T extends ClassType, X extends ClassType>
            (suffix: string, entity: T|any, inputType: X) {

    @Resolver({ isAbstract: true })
    abstract class BaseResolver {

        @Query(() => [entity], { name: `getAll${suffix}` })
        async getAll(): Promise<T[]> {
            return entity.find({});
        }


        @Mutation(() => entity, { name: `create${suffix}`})
        async save(@Arg('input', () => inputType) input: X): Promise<T> {
            const created = await entity.create(input).save();
            console.log('created', created);
            if (!!created) {
                return created;
            } else {
                throw new Conflict(`Cant create new ${suffix}`);
            }
        }
    }
    return BaseResolver;
}