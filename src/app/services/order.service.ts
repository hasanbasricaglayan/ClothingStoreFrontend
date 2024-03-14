import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/order/order';
import { OrderDTO } from '../models/order/order-dto';
import { Product } from '../models/product/product';
import { ProductDTO } from '../models/product/product-dto';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	private orders: OrderDTO[] = []
	private updatedOrders$$ = new Subject<OrderDTO[]>()
	readonly updatedOrders$ = this.updatedOrders$$.asObservable()

	baseURL = "https://localhost:7108/api/Orders"

	options = {
		headers: new HttpHeaders({
			'content-type': 'application/json',
			'authorization': 'Bearer ' + localStorage.getItem('token') || ''
		})
	}

	constructor(private http: HttpClient) { }

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

	getAllOrdersOfUserWithProducts(userId: number): Observable<OrderDTO[]> {
		const URL = `https://localhost:7108/api/Users/${userId}/Orders`

		return this.http.get<OrderDTO[]>(URL, this.options)
	}

	editOrder(orderId: number, order: OrderDTO): Observable<Order> {
		const URL = `${this.baseURL}/${orderId}`

		return this.http.put<Order>(
			URL,
			JSON.stringify({
				UserId: order.userId,
				OrderDate: order.orderDate,
				Status: order.status
			}),
			this.options)
	}

	CartOrder( product : ProductDTO, quantity : number ){
		
		const orderList = [ { product: product, quantity: quantity } ]
		const order =  { product: product, quantity: quantity }
		if (localStorage.getItem("orders") == undefined ) {
			//
			this.initCart(orderList)
		}else{
			this.addToCart(order)
		}
		

		
	}


	initCart(orderList: { product: ProductDTO; quantity: number; }[]) {
		// Sérialisation de l'objet en JSON
		const serializedOrder = JSON.stringify(orderList);
	
		// Stockage de l'objet sérialisé dans le stockage local
		localStorage.setItem('orders', serializedOrder);
	
		const deSerializedOrder = localStorage.getItem('orders');
	
		// Désérialisation de l'objet JSON récupéré
		const OrderD = JSON.parse(deSerializedOrder!);
	
		console.log(OrderD);
	}
	
	 addToCart(order: { product: ProductDTO, quantity: number; }) {
		const deSerializedOrders = localStorage.getItem('orders');
    let orders: { product: ProductDTO, quantity: number; }[] = [];
    
    if (deSerializedOrders) {
        orders = JSON.parse(deSerializedOrders);
    }
    
    orders.push(order);
    
    localStorage.setItem('orders', JSON.stringify(orders));
    
    console.log(JSON.parse(localStorage.getItem('orders')!));
	}
}

 


