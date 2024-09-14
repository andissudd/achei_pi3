import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Item } from './Item'

@Entity ()
export class Color {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @OneToMany( () => Item, item=> item.color)
    items!: Item[];
};

