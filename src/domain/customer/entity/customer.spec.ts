import Address from "../value-object/address";
import Customer from "./customer";

describe("customer unit teste", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Gabriel");
        }).toThrow("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required")
    })

    it("should change name", () => {
        const customer = new Customer("123", "Gabriel Lima");

        customer.changeName("Gabriel");


        expect(customer.name).toBe("Gabriel")
    })

    it("should add reward points", () => {

        const customer = new Customer("123", "Gabriel Lima");

        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(20);
    })

    it("should add address", () => {
        const customer = new Customer("123", "Gabriel Lima");

        const address = new Address("Rua 1", "Cidade 1", "Estado 1", "12345-123");
        customer.changeAddress(address);

        expect(customer.Address.toJSON()).toStrictEqual({
            street: "Rua 1",
            city: "Cidade 1",
            state: "Estado 1",
            zip: "12345-123"
        })

    });
})