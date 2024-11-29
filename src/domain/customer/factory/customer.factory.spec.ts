import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit teste", () => {

    it("should create a customer", () => {

        let customer = CustomerFactory.createCustomer("John");

        expect(customer.name).toBe('John');
        expect(customer.constructor.name).toBe('Customer');
        expect(customer.id).toBeDefined();
        expect(customer.Address).toBeUndefined();

    });

    it("should create a customer with address", () => {

        let address = new Address('Street 1', 'City 1', 'State 1', 'Zip 1');
        let customer = CustomerFactory.createCustomerWithAddress("John", address);

        expect(customer.name).toBe('John');
        expect(customer.constructor.name).toBe('Customer');
        expect(customer.id).toBeDefined();
        expect(customer.Address).toBe(address);

    });


});