import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Category } from "./Category"
import { User } from "./User"

@Entity ()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    state: boolean;

    @Column()
    name: string;

    @OneToOne( ()=> Category, category => category.items)
    category: Category; 
    
    @Column()
    desc: string;
    
    @Column({ type: 'datetime' })
    date_created: Date;

    @Column({ type: 'datetime', nullable: true })
    date_revovered: Date;
    
    @OneToOne( ()=> User, user => user.id)
    student_found: User; 

    @OneToOne( ()=> User, user => user.id)
    student_recovered: User; 
    
    @Column({ type: 'blob'})
    photos: Blob[];

};

