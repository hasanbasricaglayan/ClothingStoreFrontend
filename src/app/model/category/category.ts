export class Category{
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get categoryId(): number {
        return this._categoryId;
    }
    public set categoryId(value: number) {
        this._categoryId = value;
    }


    constructor(
        private _categoryId: number,
        private _name: string,
    ){}
}