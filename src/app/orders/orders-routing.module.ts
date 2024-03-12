import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
	{ path: "", component: ListOrdersComponent },
	{ path: ":orderId", component: OrderDetailsComponent },
	{ path: "", redirectTo: "orders", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OrdersRoutingModule { }
