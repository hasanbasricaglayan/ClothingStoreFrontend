import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
	declarations: [
		ListOrdersComponent,
		OrderDetailsComponent,
		EditOrderComponent
	],
	imports: [
		CommonModule,
		OrdersRoutingModule,
		FormsModule
	]
})
export class OrdersModule { }
