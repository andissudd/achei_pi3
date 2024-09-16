import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Role } from './Role';
import { Item } from './Item';

@Entity ()

export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    register!: string;
    
    @Column()
    email!: string;
    
    @Column()
    password!: string;

    @ManyToOne( ()=> Role, role => role.users)
    role!: Role; 

    @ManyToOne( () => Item, user=> user.user_recovered)
    recovered_items!: Item[];

    @ManyToOne( () => Item, user=> user.user_found)
    found_items!: Item[];

};

