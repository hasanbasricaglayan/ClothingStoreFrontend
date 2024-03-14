import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../models/user/user-dto';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	user?: UserDTO

	constructor(private router: Router, private userService: UserService) { }

	goToEditPage() {
		this.router.navigate(["/edit-user"]);
	}

	goToOrdersPage() {
		this.router.navigate(["/orders"]);
	}

	deconnect() {
		localStorage.removeItem("token")
		this.router.navigate(["/login"])
	}

	ngOnInit(): void {
		this.userService.getUserByToken().subscribe(user => {
			this.user = user
		})
	}
}
