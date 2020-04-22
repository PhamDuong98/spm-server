import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail';

@Entity()
export class Order {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({
        type: 'date'
    })
    public dateCreated: Date;

    @OneToMany(type => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];
}
