import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class Manufacturer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    adminEmail: string;

    @Column()
    companyName: string;

    @Column()
    tinNumber: string;

    @Column()
    streetAddress: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column()
    companyWebsite: string;


}