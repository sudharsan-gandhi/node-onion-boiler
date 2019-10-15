import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

export interface UserInterface {
    id?: number;
    name: string;
    email: string;
    password: string;
}

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    // @ManyToMany(type => Vehicle, { eager: true })
    // @JoinTable()
    // public vehicles: Vehicle[];

}