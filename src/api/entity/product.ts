import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail';
import { Unit } from './unit';
import { Category } from './category';

@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    public barcode: string;

    @Column({
        type: 'varchar',
        length: 250
    })
    public name: string;

    @Column({
        type: 'int'
    })
    public importPrice: number;

    @Column({
        type: 'int'
    })
    public exportPrice: number;

    @Column({
        type: 'date'
    })
    public lastUpdate: Date;

    @Column({
        type: 'int'
    })
    public status: number;

    @OneToMany(type => OrderDetail, orderDetail => orderDetail.product)
    orderDetails: OrderDetail[];

    @ManyToOne(type => Unit, unit => unit.products)
    public unit: Unit;

    @ManyToOne(type => Category, category => category.products)
    public category: Category;
}
