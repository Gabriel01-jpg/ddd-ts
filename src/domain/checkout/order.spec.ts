import Order from "./entity/order";
import OrderItem from "./entity/order_item";

describe("Order unit teste", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrow("Id is required");
    })

    it("should throw error when CustomerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrow("CustomerId is required");
    })

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrow('Item is required');
    })

    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, "123", 1);
        const item2 = new OrderItem("i2", "Item 2", 200, "123", 1);
       
        const order = new Order("order1", "customer1", [item])

        const total = order.total();

        expect(total).toBe(100);

        const order2 = new Order("order2", "customer1", [item, item2]);

        expect(order2.total()).toBe(300);

    })

    it("should throw error if the qty is greater than 0", () => {
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
            const order = new Order("order1", "customer1", [item])
        }).toThrow("quantity must be greater than 0");
    })
})