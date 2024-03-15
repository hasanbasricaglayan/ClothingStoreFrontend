import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user/user-dto';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	user?: UserDTO
	role?: boolean

	constructor(private router: Router, private userService: UserService, private loginService: LoginService) { }

	isAdmin() {
		if (localStorage.getItem("role") == "client") {
			this.role = false
		}
		else {
			this.role = true
		}
	}

	goToAdminUsersListPage() {
		this.router.navigate(["/users"])
	}

	goToAdminOrdersListPage() {
		this.router.navigate(["/orders"])
	}

	goToAdminCategoriesListPage() {
		this.router.navigate(["/categories"])
	}

	goToAdminProductsListPage() {
		this.router.navigate(["/products/admin"])
	}

	goToEditAccountPage() {
		this.router.navigate(["/account/edit"])
	}

	goToOrdersListPage() {
		this.router.navigate(["/orders"])
	}

	deconnect() {
		this.loginService.deconnection()
		this.router.navigate(["/account/login"])
	}

	ngOnInit(): void {
		this.userService.getUserByToken().subscribe(user => {
			this.user = user
			this.isAdmin()
		})
	}
}
