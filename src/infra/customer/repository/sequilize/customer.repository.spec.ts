import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../database/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "Customer 1");
        const address = new Address("street", "city", "state", "zip");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerCreated = await customerRepository.find("c1")

        expect(customerCreated).toEqual({
            ...customer
        })
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "Customer 1");
        const address = new Address("street", "city", "state", "zip");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "c1",
            name: "Customer 1",
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            zipCode: address.zip,
            state: address.state,
            city: address.city,
        })

        customer.changeName("customer 2");


        await customerRepository.update(customer);

        const customerUpdated = await CustomerModel.findOne({ where: { id: "c1" } });

        expect(customerUpdated.toJSON()).toStrictEqual({
            id: "c1",
            name: "customer 2",
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            zipCode: address.zip,
            state: address.state,
            city: address.city,
        })
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("c1", "customer 1");
        const address = new Address("street", "city", "state", "zip");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerFound = await customerRepository.find("c1");

        expect(customerFound).toStrictEqual(customer);
    });

    it("should find all products", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("c1", "Customer 1");
        const address = new Address("street", "city", "state", "zip");
        customer1.changeAddress(address);
        const customer2 = new Customer("c2", "Customer 2");
        customer2.changeAddress(address);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customersFound = await customerRepository.findAll();

        expect(customersFound).toStrictEqual([customer1, customer2]);
    });
});