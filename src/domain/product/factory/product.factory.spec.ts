import ProductFactory from "./product.factory";

describe("Product factory unit teste", () => {

    it("should create a product type a", () => {
        let product = ProductFactory.create('a', 'Product 1', 100)

        expect(product.name).toBe('Product 1');
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe('Product');
    })

    it("should create a product type b", () => {
        let product = ProductFactory.create('b', 'Product B', 10)

        expect(product.name).toBe('Product B');
        expect(product.price).toBe(20);
        expect(product.constructor.name).toBe('ProductB');
    })

    it("should throw an error when type is invalid", () => {
        expect(() => {
            ProductFactory.create('c', 'Product C', 10)
        }).toThrow('Product type is not supported');
    });

});