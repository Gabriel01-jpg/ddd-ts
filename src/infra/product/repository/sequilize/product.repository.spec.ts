import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../database/sequelize/model/product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("product1", "Product 1", 100);

        await productRepository.create(product);

        const productCreated = await ProductModel.findOne({ where: { id: "product1" } });

        expect(productCreated.toJSON()).toStrictEqual({
            id: "product1",
            name: "Product 1",
            price: 100,
        })

    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("product1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "product1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "product1",
            name: "Product 1",
            price: 100,
        })

        product.changeName("Product 2");
        product.changePrice(200);


        await productRepository.update(product);

        const productUpdated = await ProductModel.findOne({ where: { id: "product1" } });

        expect(productUpdated.toJSON()).toStrictEqual({
            id: "product1",
            name: "Product 2",
            price: 200,
        })
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("product1", "Product 1", 100);

        await productRepository.create(product);

        const productFound = await productRepository.find("product1");

        expect(productFound).toStrictEqual(product);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();

        const product1 = new Product("product1", "Product 1", 100);
        const product2 = new Product("product2", "Product 2", 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const productsFound = await productRepository.findAll();

        expect(productsFound).toStrictEqual([product1, product2]);
    });
});