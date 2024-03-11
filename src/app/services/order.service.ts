import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/order';
import { OrderDTO } from '../models/order-dto';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	private orders: Order[] = []
	updatedOrders = new Subject<Order[]>()

	baseURL = "https://localhost:7108/api/Orders"

	constructor(private http: HttpClient) { }
	 options = {
		headers: new HttpHeaders(
		  { 
			'content-type': 'application/json',
			'authorization' : 'Bearer ' + localStorage.getItem('token') || ''
		  }
		)
	  };

	getOrders(): Observable<Order[]> {
		
		 
		const URL = `${this.baseURL}/`
		return  this.http.get<Order[]>(URL,this.options)
	}

	getOrderById(orderId: number): Observable<Order> {
		const URL = `${this.baseURL}/${orderId}`
		return this.http.get<Order>(URL,this.options)
	}

	editOrder(orderId: number, orderDTO: OrderDTO): Observable<Order> {
		const URL = `${this.baseURL}/${orderId}`
		/* const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json'
			})
		} */

		return this.http.put<Order>(
			URL,
			JSON.stringify({
				Status: orderDTO.status,
			}),
			this.options)
	}
}
