export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _productId: string;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number){
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity =  quantity;
    }

    get id(){
        return this._id;
    }

    get price(){
        return this._price;
    }

    get quantity(){
        return this._quantity;
    }

    get productId(){
        return this._productId;
    }

    get name(){
        return this._name;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}