import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { OrderDTO } from 'src/app/models/order/order-dto';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
	user?: UserDTO
	orders?: OrderDTO[]

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

	getUserByIdWithProducts() {
		this.activatedRoute.params.pipe(
			concatMap(params => {
				const userId = params['userId']
				return this.userService.getUserByIdWithOrdersAndProducts(userId)
			})
		)
			.subscribe({
				next: user => {
					this.user = user
					this.orders = user.orders
				},
				error: () => {
					this.router.navigate(['/users'])
				}
			})
	}

	editUser() {
		this.userService.editUser(this.user!.userId!, this.user!).subscribe(() => {
			this.router.navigate(['/users'])
		})
	}

	ngOnInit(): void {
		this.getUserByIdWithProducts()
	}
}
