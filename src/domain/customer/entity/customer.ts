import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer implements CustomerInterface {
    private _id: string;
    private _name: string
    private _address?: Address
    private _rewardPoints: number = 0
    private _active: boolean = true


    constructor(id: string, name: string, address?: Address) {
        this._id = id
        this._name = name
        this._address = address
        
        this.validate();
    }

    validate() {
        if(this._name.length === 0) {
            throw new Error('Name is required');
        }
        if(this._id.length === 0) {
            throw new Error('Id is required');
        }
        if(this._address === null) {
            throw new Error('Address is required');
        }
    }

    changeName(name: string){
        this._name = name;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    changeAddress(address: Address){
        this._address = address;
    }

    isActive(){
        return this._active;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }

    get Address(): Address {
        return this._address;
    }

    get id(): string {
        return this._id;
    }


}