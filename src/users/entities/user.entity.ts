import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    apartment: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;
}
