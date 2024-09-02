import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Entity ()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    state: boolean; 
    
    @Column({ type: 'date' })
    date_booked: Date;

    @Column({ type: 'date', nullable: true })
    date_concluded: Date; 

    @OneToOne( ()=> Item, item => item.category)
    items: Item; 

    @OneToOne( ()=> User, user => user.id)
    student_booked: User; 

};

