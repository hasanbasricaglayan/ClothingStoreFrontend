import { OrderDTO } from "../order/order-dto"

export interface UserDTO {
	userId?: number
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	password: string
	dateOfBirth: Date
	billingAdress: string
	deliveryAdress: string
	isAdmin: boolean
	orders?: OrderDTO[]
}
