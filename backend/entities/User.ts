import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity ()

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    // @Column()
    // role: string; 

    // @Column({default: true})
    // isActive: boolean;

};

