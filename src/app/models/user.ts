export class User {
	userId: number
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	password: string
	dateOfBirth: Date
	billingAdress: string
	deliveryAdress: string
	isAdmin: boolean

	constructor(
		userId: number,
		firstName: string,
		lastName: string,
		phoneNumber: string,
		email: string,
		password: string,
		dateOfBirth: Date,
		billingAdress: string,
		deliveryAdress: string,
		isAdmin: boolean
	) {
		this.userId = userId
		this.firstName = firstName
		this.lastName = lastName
		this.phoneNumber = phoneNumber
		this.email = email
		this.password = password
		this.dateOfBirth = dateOfBirth
		this.billingAdress = billingAdress
		this.deliveryAdress = deliveryAdress
		this.isAdmin = isAdmin
	}
}
