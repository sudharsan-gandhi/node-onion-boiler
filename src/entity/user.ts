import { Entity, Column, ManyToMany, JoinTable, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('User')
export class User {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    public name: string;

    // @ManyToMany(type => Vehicle, { eager: true })
    // @JoinTable()
    // public vehicles: Vehicle[];

}