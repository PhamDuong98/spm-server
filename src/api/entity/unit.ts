import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./product";

@Entity()
export class Unit {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "varchar",
        length: 100
    })
    public name: string;

    @OneToMany(type => Product, products => products.unit)
    products: Product[];
}
