import { Order } from "../order/order"

export class User {
	userId: number
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	password: string
	dateOfBirth: Date
	billingAddress: string
	deliveryAddress: string
	isAdmin: boolean
	orders: Order[]

	constructor(
		userId: number,
		firstName: string,
		lastName: string,
		phoneNumber: string,
		email: string,
		password: string,
		dateOfBirth: Date,
		billingAddress: string,
		deliveryAddress: string,
		isAdmin: boolean,
		orders: Order[]
	) {
		this.userId = userId
		this.firstName = firstName
		this.lastName = lastName
		this.phoneNumber = phoneNumber
		this.email = email
		this.password = password
		this.dateOfBirth = dateOfBirth
		this.billingAddress = billingAddress
		this.deliveryAddress = deliveryAddress
		this.isAdmin = isAdmin
		this.orders = orders
	}
}
