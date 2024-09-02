import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item"

@Entity ()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany( ()=> Item, item => item.id)
    items: Item[]; 
};

