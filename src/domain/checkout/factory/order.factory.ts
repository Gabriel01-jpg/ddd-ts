import CustomerInterface from "../../customer/entity/customer.interface";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        price: number;
        quantity: number;
    }[];
}

export default class OrderFactory {
    public static createOrder(props: OrderFactoryProps): Order {

        const items = props.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
        });


        return new Order(props.id, props.customerId, items);
    }
}