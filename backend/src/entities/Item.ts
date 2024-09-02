import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
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

    @Column()
    category: string;

    @Column()
    color: string;

    @Column()
    size: string;
    
    @Column()
    desc: string;
    
    @Column({ type:'date'})
    date_created: Date;

    @Column({ type: 'date', nullable: true})
    date_revovered: Date | null;

    // @ManyToOne( ()=> User, user => user.found_items)
    // user_found: User["id"]; 

    @ManyToOne( ()=> User, user => user.found_items)
    user_found: User; 

    @ManyToOne( ()=> User, user => user.recovered_items)
    user_recovered: User | null; 
    
    @Column({ type: 'blob', nullable: true})
    photos: Blob[];

};

