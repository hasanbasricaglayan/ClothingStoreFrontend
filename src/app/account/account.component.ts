import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../models/user/user-dto';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	constructor(private router: Router, private userService: UserService , private loginService : LoginService) { }

	user?: UserDTO

	goToEditPage() {
		this.router.navigate(["/edit-user"]);
	}

	goToOrderPage() {
		this.router.navigate(["/orders"]);
	}

	deconnect() {
		this.loginService.deconnection()
		this.router.navigate(["/login"])
	}

	ngOnInit(): void {

		console.log("Account")
		this.userService.getUserByToken().subscribe(user => {
			this.user = user;
			console.log(this.user?.firstName)

		})
	}
}
