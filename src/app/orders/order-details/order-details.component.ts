import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { OrderProductDTO } from 'src/app/models/order-product/order-product-dto';
import { OrderDTO } from 'src/app/models/order/order-dto';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-order-details',
	templateUrl: './order-details.component.html',
	styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
	user?: UserDTO

	orderProducts?: OrderProductDTO[]
	order?: OrderDTO
	selectedOrder?: OrderDTO
	orderStatus: string[] = ["En attente", "Validée", "Expédiée", "Livrée"]
	orderTotalPrice = 0

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private orderService: OrderService,
		private userService: UserService
	) { }

	showEditOrder(order: OrderDTO) {
		this.selectedOrder = order
	}

	hideEditOrder() {
		this.selectedOrder = undefined
	}

	getTotalPriceOfProduct(product: OrderProductDTO) {
		return product.quantity * product.price
	}

	getTotalPriceOfOrder(orderProducts: OrderProductDTO[]) {
		if (orderProducts == undefined) {
			return 0
		}

		let totalPriceOfOrder = 0
		for (let i = 0; i < orderProducts.length; i++) {
			totalPriceOfOrder = totalPriceOfOrder + this.getTotalPriceOfProduct(orderProducts[i])
		}

		return totalPriceOfOrder
	}

	getOrderByIdWithUser() {
		this.activatedRoute.params.pipe(
			concatMap(params => {
				const orderId = params['orderId']
				return this.orderService.getOrderByIdWithProducts(orderId)
			}),
			concatMap(order => {
				this.order = order
				this.orderTotalPrice = this.getTotalPriceOfOrder(order.products)
				return this.userService.getUserByIdWithOrdersAndProducts(order.userId)
			})
		)
			.subscribe({
				next: user => {
					this.user = user
				},
				error: () => {
					this.router.navigate(['/orders'])
				}
			})
	}

	editOrder(form: NgForm) {
		let order: OrderDTO = {
			orderId: this.order!.orderId,
			userId: this.order!.userId,
			orderDate: this.order!.orderDate,
			status: form.value.status,
			products: this.order!.products
		}
		this.orderService.editOrder(order.orderId!, order).subscribe(() => {
			this.router.navigate(['/orders'])
		})
	}

	ngOnInit(): void {
		this.getOrderByIdWithUser()
	}
}
