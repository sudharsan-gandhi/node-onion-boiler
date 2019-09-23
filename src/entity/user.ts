import { Entity, Column, ManyToMany, JoinTable, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity('User')
export class User extends BaseEntity {

    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    public name: string;

    // @ManyToMany(type => Vehicle, { eager: true })
    // @JoinTable()
    // public vehicles: Vehicle[];

}