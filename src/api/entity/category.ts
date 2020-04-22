import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./product";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "varchar",
        length: 100
    })
    public name: string;

    @OneToMany(type => Product, products => products.category)
    products: Product[];
}
