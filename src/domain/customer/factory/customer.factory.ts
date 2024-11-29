import Customer from "../entity/customer";
import { v4 as uuid } from 'uuid';
import CustomerInterface from "../entity/customer.interface";
import Address from "../value-object/address";

export default class CustomerFactory {
    public static createCustomer(name: string): CustomerInterface {
        return new Customer(uuid(), name);
    }

    public static createCustomerWithAddress(name: string, address: Address): CustomerInterface {
        return new Customer(uuid(), name, address);
    }
}