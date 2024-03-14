import { OrderDTO } from "../order/order-dto"

export interface UserDTO {
	userId?: number
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	password: string
	dateOfBirth: Date
	billingAddress: string
	deliveryAddress: string
	isAdmin: boolean
	orders?: OrderDTO[]
}
