import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../database/sequelize/model/product.model";
import CustomerModel from "../../../database/sequelize/model/customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "../../../database/sequelize/model/order.model";
import OrderItemModel from "../../../database/sequelize/model/order-item.model";
import ProductRepository from "../../../product/repository/sequilize/product.repository";
import OrderRepository from "./order.repository";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";


describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: false },
        });

        await sequelize.addModels([
            OrderItemModel,
            OrderModel,
            CustomerModel,
            ProductModel,
        ]);
        
        await sequelize.sync();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "Customer 1");
        const address = new Address('street', 'city', 'state', 'zip');

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("p1", "Product 1", 100);

        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);

        const orderRepository = new OrderRepository();

        const order = new Order("o1", customer.id, [orderItem]);

        orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: OrderItemModel });

        const orderItemModel = await OrderItemModel.findAll({ include: ProductModel });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: product.name,
                    price: product.price,
                    product_id: product.id,
                    quantity: 2,
                    total: 200,
                    order_id: order.id
                }
            ]
        });

    })

    afterEach(async () => {
        await sequelize.close();
    });

});