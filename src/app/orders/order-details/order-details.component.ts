import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { Order } from '../../models/order';
import { OrderDTO } from '../../models/order-dto';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-order-details',
	templateUrl: './order-details.component.html',
	styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
	order?: Order
	//orderDTO?: OrderDTO
	orderStatus: string[] = ["En attente", "Validée", "Expédiée", "Livrée"]

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private orderService: OrderService) { }

	getOrderById() {
		this.activatedRoute.params.pipe(
			concatMap(params => {
				const orderId = params['orderId']
				return this.orderService.getOrderById(orderId)
			})
		)
			.subscribe({
				next: order => this.order = order,
				error: () => {
					this.router.navigate(['/orders'])
				}
			})
	}

	editOrderStatus(form: NgForm) {
		let orderDTO: OrderDTO = {
			status: form.value.status
		}
		this.orderService.editOrder(this.order!.orderId, orderDTO)
			.subscribe(() => this.router.navigate(['/orders']))
	}

	ngOnInit(): void {
		this.getOrderById()
	}
}
