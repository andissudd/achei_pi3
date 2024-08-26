import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from './User'

@Entity ()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @OneToMany( () => User, user=> user.role)
    users!: User[];


};

