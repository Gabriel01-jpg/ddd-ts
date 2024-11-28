import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository-interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../../../database/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            zipCode: entity.Address.zip,
            city: entity.Address.city,
            state: entity.Address.state,
            active: true,
            rewardPoints: entity.rewardPoints
        })
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
              name: entity.name,
              street: entity.Address.street,
              zipCode: entity.Address.zip,
              city: entity.Address.city,
              state: entity.Address.state,
              active: entity.isActive(),
              rewardPoints: entity.rewardPoints,
            },
            {
              where: {
                id: entity.id,
              },
            }
        );
    }
    delete(entity: Customer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<Customer> {
        let customer;
        try {

            customer = await CustomerModel.findOne(
                { 
                    rejectOnEmpty: true,
                    where: { 
                        id ,
                    }            
                },
                
                
            );

            const customerEntity = new Customer(customer.id, customer.name);
            customerEntity.changeAddress(new Address(customer.street, customer.city, customer.state, customer.zipCode));

            return customerEntity;
        } catch(error) {
            throw new Error("Customer not found.");
        }
    }
    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        const customers = customerModels.map((customerModels) => {
          let customer = new Customer(customerModels.id, customerModels.name);
          customer.addRewardPoints(customerModels.rewardPoints);
          const address = new Address(
            customerModels.street,
            customerModels.city,
            customerModels.state,
            customerModels.zipCode
          );
          customer.changeAddress(address);
          return customer;
        });
    
        return customers;
    }
    
}