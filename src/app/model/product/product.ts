export class Product {
    public get categoryId(): number {
        return this._categoryId;
    }
    public set categoryId(value: number) {
        this._categoryId = value;
    }
    public get imageURL(): string {
        return this._imageURL;
    }
    public set 
    imageURL(value: string) {
        this._imageURL = value;
    }
    public get quantityInStock(): number {
        return this._quantityInStock;
    }
    public set quantityInStock(value: number) {
        this._quantityInStock = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get price(): number {
        return this._price;
    }
    public set 
    price(value: number) {
        this._price = value;
    }
    public get size(): string {
        return this._size;
    }
    public set size(value: string) {
        this._size = value;
    }
    public get brand(): string {
        return this._brand;
    }
    public set brand(value: string) {
        this._brand = value;
    }
    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get productId(): number {
        return this._productId;
    }
    public set productId(value: number) {
        this._productId = value;
    }


    constructor(
        private _productId: number,
        private _name: string,
        private _color: string,
        private _brand: string,
        private _size: string,
        private _price: number,
        private _description: string,
        private _quantityInStock: number,
        private _imageURL: string,
        private _categoryId: number
    ){}
}