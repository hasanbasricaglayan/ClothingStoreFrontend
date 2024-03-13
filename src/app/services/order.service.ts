import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/order/order';
import { OrderDTO } from '../models/order/order-dto';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	private orders: OrderDTO[] = []
	private updatedOrders$$ = new Subject<OrderDTO[]>()
	readonly updatedOrders$ = this.updatedOrders$$.asObservable()

	baseURL = "https://localhost:7108/api/Orders"

	constructor(private http: HttpClient) { }
	options = {
		headers: new HttpHeaders({
			'content-type': 'application/json',
			'authorization': 'Bearer ' + localStorage.getItem('token') || ''
		})
	}

	getAllOrdersWithProducts(): Observable<OrderDTO[]> {
		const URL = `${this.baseURL}/`

		this.http.get<OrderDTO[]>(URL, this.options).subscribe(orders => {
			this.orders = orders
			this.updatedOrders$$.next([...this.orders])
		})

		return this.updatedOrders$
	}

	getOrderByIdWithProducts(orderId: number): Observable<OrderDTO> {
		const URL = `${this.baseURL}/${orderId}`

		return this.http.get<OrderDTO>(URL, this.options)
	}

	getAllOrdersOfUserWithProducts(userId: number) {
		const URL = `https://localhost:7108/api/Users/${userId}/Orders`

		return this.http.get<OrderDTO[]>(URL, this.options)
	}

	editOrder(orderId: number, order: OrderDTO): Observable<Order> {
		const URL = `${this.baseURL}/${orderId}`

		// const options = {
		// 	headers: new HttpHeaders({
		// 		'content-type': 'application/json'
		// 	})
		// }

		return this.http.put<Order>(
			URL,
			JSON.stringify({
				UserId: order.userId,
				OrderDate: order.orderDate,
				Status: order.status
			}),
			this.options)
	}
}
