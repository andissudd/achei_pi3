import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne     } from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Entity ()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    state: boolean; 

    @Column()
    code: string; 
    
    @Column({ type: 'date' })
    date_booked: Date;

    @Column({ type: 'date', nullable: true })
    date_concluded: Date | null; 

    @OneToOne( ()=> Item, item => item.id)
    @JoinColumn({name: 'item_book_id'})
    item: Item; 

    @ManyToOne( ()=> User, user => user.id)
    user_booked: User; 

};

