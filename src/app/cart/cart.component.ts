import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProduct } from '../models/order-product/order-product';
import { Order } from '../models/order/order';
import { Product } from '../models/product/product';
import { UserDTO } from '../models/user/user-dto';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { OrderDTO } from '../models/order/order-dto';
import { OrderProductDTO } from '../models/order-product/order-product-dto';
import { ProductDTO } from '../models/product/product-dto';
import { DatePipe } from '@angular/common';
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


	token?: boolean
	user?: UserDTO
	orders?: Order
	orderProducts?: OrderProduct[] = []
	orderTotalPrice?: number
	constructor(private userService: UserService, private orderService: OrderService, private router: Router) { }


	ListProductToOrder() {

		const deSerializedOrder = localStorage.getItem('orders');

		// Désérialisation de l'objet JSON récupéré
		const OrderD = JSON.parse(deSerializedOrder!);

		this.orders = new Order(
			0,
			this.user!.userId!,
			new Date(),
			"En attente",
			this.orderProducts!
		);

		OrderD.forEach((element: { product: Product; quantity: number; }) => {
			var orderList = new OrderProduct(0, this.orders!, element.product.productId, element.product, element.quantity, element.product.price)
			this.orderProducts?.push(orderList)
		});

		//console.log(this.orders)

	}

	sendOrder() {
		console.log(this.orders)
		let orderProductsDTO: OrderProductDTO[] = []

		this.orderProducts!.forEach(element => {
			let Product_Dto : ProductDTO = {
				productId : element.product?.productId,
				price : element.product!.price,
				categoryId : element.product!.categoryId,
				brand : element.product!.brand,
				name : element.product!.name,
				color : element.product!.color,
				size : element.product!.size,
				description :element.product!.description,
				imageURL : element.product!.imageURL,
				quantityInStock : element.product!.quantityInStock


			}
			let orderPDto : OrderProductDTO = {
				productId : element.productId,
				quantity : element.quantity,
				price : element.price,
				product : Product_Dto
				
			}

			orderProductsDTO.push(orderPDto)
			
		});


		let orderDto: OrderDTO = {
			userId: this.orders!.userId,
			orderDate: this.orders!.orderDate,
			status: this.orders!.status,
			products: orderProductsDTO!
		}
		console.log(orderDto)

		this.orderService.addOrder(orderDto)
	}


	getTotalPriceOfOrder(orderProducts: OrderProduct[]) {
		if (orderProducts == undefined) {
			return 0
		}
		let totalPriceOfOrder = 0
		for (let i = 0; i < orderProducts.length; i++) {
			totalPriceOfOrder = totalPriceOfOrder + this.getTotalPriceOfProduct(orderProducts[i])
		}
		return totalPriceOfOrder
	}

	getTotalPriceOfProduct(product: OrderProduct) {
		return product.quantity * product.price
	}

	deleteOrderProduct(name: string) {
		var newOrders = this.orders!.products.filter(p =>
			p.product?.name != name
		)
		console.log(newOrders)
		this.orders!.products = newOrders
		this.orderProducts = newOrders

		console.log(this.orders)
		this.orderTotalPrice = this.getTotalPriceOfOrder(this.orders!.products)

		this.refreshLocalStorage()
		this.router.navigate(["/cart"])
	}

	refreshLocalStorage() {
		localStorage.removeItem('orders');

		this.orderProducts?.forEach(element => {
			this.orderService.CartOrder(element.product!, element.quantity)
		});
	}

	ngOnInit(): void {
		console.log("Account")
		if (localStorage.getItem("token") != undefined) {
			this.token! = true
		} else { this.token = false }

		this.userService.getUserByToken().subscribe(user => {
			this.user = user;
			this.ListProductToOrder()
			this.orderTotalPrice = this.getTotalPriceOfOrder(this.orders!.products)
		})


	}

}
