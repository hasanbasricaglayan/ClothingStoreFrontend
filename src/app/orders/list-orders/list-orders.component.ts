import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { OrderDTO } from 'src/app/models/order/order-dto';
import { OrderToDisplay } from 'src/app/models/order/order-to-display';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserToDisplay } from 'src/app/models/user/user-to-display';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-list-orders',
	templateUrl: './list-orders.component.html',
	styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit, OnDestroy {
	usersSubscription?: Subscription
	users: UserDTO[] = []

	ordersSubscription?: Subscription
	orders: OrderDTO[] = []
	ordersToDisplay?: OrderToDisplay[]

	constructor(private orderService: OrderService, private userService: UserService) { }

	ordersToOrdersToDisplay(): OrderToDisplay[] {
		return this.orders.map(order => {
			const user = this.users.find(user => user.userId === order.userId)
			return {
				orderId: order.orderId,
				userId: order.userId,
				orderDate: order.orderDate,
				status: order.status,
				orderUser: {
					fullName: this.userService.getUserFullName(user!),
					phoneNumber: user!.phoneNumber,
					email: user!.email,
					billingAdress: user!.billingAddress,
					deliveryAdress: user!.deliveryAddress
				} as UserToDisplay
			} as OrderToDisplay
		})
	}

	getAllOrdersWithProductsOfAllUsers() {
		this.userService.getAllUsersWithOrdersAndProducts().pipe(
			concatMap(() => {
				return this.orderService.getAllOrdersWithProducts()
			})
		)
			.subscribe(() => {
				this.ordersToDisplay = this.ordersToOrdersToDisplay()
			})
	}

	ngOnInit(): void {
		this.usersSubscription = this.userService.updatedUsers$.subscribe(users => {
			this.users = users
		})

		this.ordersSubscription = this.orderService.updatedOrders$.subscribe(orders => {
			this.orders = orders
		})

		this.getAllOrdersWithProductsOfAllUsers()
	}

	ngOnDestroy(): void {
		this.usersSubscription?.unsubscribe()
		this.ordersSubscription?.unsubscribe()
	}
}
