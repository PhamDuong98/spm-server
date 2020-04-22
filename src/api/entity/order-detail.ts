import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderDetail {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({
        type: 'int'
    })
    public salePrice: number;

    @ManyToOne(type => Order, order => order.orderDetails)
    public order: Order;

    @ManyToOne(type => Product, product => product.orderDetails)
    public product: Product;
}
