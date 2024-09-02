import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./Category"
import { Color } from "./Color"
import { Size } from "./Size"
import { User } from "./User"

@Entity ()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    state: boolean;

    @ManyToOne( ()=> Category, category => category.items)
    category: Category;

    @ManyToOne( ()=> Color, color => color.items)
    color: Color;

    @ManyToOne( ()=> Size, size => size.items)
    size: Size;
    
    @Column()
    desc: string;
    
    @Column({ type:'date'})
    date_created: Date;

    @Column({ type: 'date', nullable: true })
    date_revovered: Date | null;
    
    @OneToOne( ()=> User)
    @JoinColumn()
    student_found: User; 

    @OneToOne( ()=> User)
    @JoinColumn()
    student_recovered: User | null; 
    
    // @Column({ type: 'blob'})
    // photos: Blob[];

};

