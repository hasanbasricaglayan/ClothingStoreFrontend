import { UserToDisplay } from "./user-to-display"

export interface OrderToDisplay {
	orderId: number
	orderDate: Date
	status: string
	orderUser: UserToDisplay
}
