import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UserInput {

    @Field(() => String)
    name: string;

}