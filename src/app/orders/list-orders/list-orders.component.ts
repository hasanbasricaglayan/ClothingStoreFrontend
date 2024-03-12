import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { OrderToDisplay } from 'src/app/models/order-to-display';
import { User } from 'src/app/models/user';
import { UserToDisplay } from 'src/app/models/user-to-display';
import { UserService } from 'src/app/services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-list-orders',
	templateUrl: './list-orders.component.html',
	styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit, OnDestroy {
	usersSubscription?: Subscription
	users?: User[]
	UserCurrent? : User
	ordersSubscription?: Subscription
	orders?: Order[]
	ordersToDisplay?: OrderToDisplay[]

	constructor(private orderService: OrderService, private userService: UserService) { }

	adminOrdersToOrdersToDisplay(): OrderToDisplay[] {
		return this.orders!.map(order => {
			const user = this.users!.find(user => user.userId === order.userId)
			return {
				orderId: order.orderId,
				orderDate: order.orderDate,
				status: order.status,
				orderUser: {
					userId: order.userId,
					fullName: this.userService.getUserFullName(user!),
					phoneNumber: user!.phoneNumber,
					email: user!.email,
					billingAdress: user!.billingAdress,
					deliveryAdress: user!.deliveryAdress
				} as UserToDisplay
			} as OrderToDisplay
		})
	}

	ordersToOrdersToDisplay(): OrderToDisplay[] {
		return this.orders!.map(order => {
			//const user = this.users!.find(user => user.userId === order.userId)
			return {
				orderId: order.orderId,
				orderDate: order.orderDate,
				status: order.status,
				orderUser: {
					userId: order.userId,
					fullName: this.UserCurrent?.firstName,
					phoneNumber: this.UserCurrent?.phoneNumber,
					email: this.UserCurrent?.email,
					billingAdress: this.UserCurrent?.billingAdress,
					deliveryAdress: this.UserCurrent?.deliveryAdress
				} as UserToDisplay
			} as OrderToDisplay
		})
	}


	getOrdersWithUsersForAdmin() {
		this.userService.getUsers().pipe(
			concatMap(users => {
				this.users = users
				return this.orderService.getOrders()
			})
		)
			.subscribe(orders => {
				this.orders = orders
				this.ordersToDisplay = this.ordersToOrdersToDisplay()
			})
	}


	getOrdersWithUsers() {
		this.userService.getUserById(this.UserCurrent!.userId).pipe(
			concatMap(user => {
				
				return this.orderService.getOrdersByUser(user.userId)
			})
		)
			.subscribe(orders => {
				this.orders = orders
				this.ordersToDisplay = this.ordersToOrdersToDisplay()
			})
	}

	ngOnInit(): void {
		this.userService.getUserByToken().subscribe( user => {
			this.UserCurrent = user;
		console.log(this.UserCurrent?.firstName)
		this.getOrdersWithUsers()
	})
		
		
	}

	ngOnDestroy(): void {
	}
}
