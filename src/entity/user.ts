import { Entity, Column, ManyToMany, JoinTable, ObjectID, ObjectIdColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity('User')
export class User {

    @Field(type => ID)
    @ObjectIdColumn()
    _id: ObjectID;

    @Field()
    @Column()
    public name: string;

    // @ManyToMany(type => Vehicle, { eager: true })
    // @JoinTable()
    // public vehicles: Vehicle[];

}