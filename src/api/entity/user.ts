import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Index({ unique: true })
    @Column({
        type: "varchar",
        length: 50
    })
    public username: string;

    @Column({
        type: "varchar",
        length: 250,
        select: false
    })
    public encryptedPassword: string;

    @Column({
        type: "varchar",
        length: 250
    })
    public fullName: string;
}
