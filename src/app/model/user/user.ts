export class User{
    public get isAdmin(): boolean {
        return this._isAdmin;
    }
    public set isAdmin(value: boolean) {
        this._isAdmin = value;
    }
    public get deliveryAdress(): string {
        return this._deliveryAdress;
    }
    public set deliveryAdress(value: string) {
        this._deliveryAdress = value;
    }
    public get billingAdress(): string {
        return this._billingAdress;
    }
    public set billingAdress(value: string) {
        this._billingAdress = value;
    }
    public get dateOfBirth(): Date {
        return this._dateOfBirth;
    }
    public set dateOfBirth(value: Date) {
        this._dateOfBirth = value;
    }
    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get userId(): number {
        return this._userId;
    }
    public set userId(value: number) {
        this._userId = value;
    }
    constructor(

        private _userId: number,
        private _firstName: string,
        private _lastName: string,
        private _phoneNumber: string,
        private _email: string,
        private _password: string,
        private _dateOfBirth: Date,
        private _billingAdress: string,
        private _deliveryAdress: string,
        private _isAdmin: boolean
    ){}
}