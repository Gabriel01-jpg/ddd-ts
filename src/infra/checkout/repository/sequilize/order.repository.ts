import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface";
import OrderItemModel from "../../../database/sequelize/model/order-item.model";
import OrderModel from "../../../database/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                total: item.orderItemTotal()
            }))
        }, { include: OrderItemModel });
    }
    update(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
    
}