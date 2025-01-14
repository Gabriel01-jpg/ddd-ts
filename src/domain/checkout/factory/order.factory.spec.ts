import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';

describe("Order factory unit teste", () => {

    it("should create an order", () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: 'Product 1',
                    productId: uuid(),
                    price: 100,
                    quantity: 2
                }
            ],
        }

        let order = OrderFactory.createOrder(orderProps);

        expect(order.id).toBe(orderProps.id);

        expect(order.customerId).toBe(orderProps.customerId);

        expect(order.items.length).toBe(1);

    });

});