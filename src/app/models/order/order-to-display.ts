import { UserToDisplay } from "../user/user-to-display"

export interface OrderToDisplay {
	orderId?: number
	userId: number
	orderDate: Date
	status: string
	orderUser: UserToDisplay
}
